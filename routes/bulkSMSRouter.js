import express from "express";
import Hacker from "../models/Hacker.js";
import Teams from "../models/Teams.js";
import os from "os";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";
import getAccessToken from "../utils/gSheet.js";
import redisClient from "../utils/redis.js";
import axios from "axios";

const router = express.Router();

router.get("/hey", async (req, res) => {
  try {

    res.status(200).json({ success: { msg: "Jobs completed!" } })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "The server is currently experiencing difficulties. Please try again.", path: "internalerror" } })
  }
})

//fire reminders to all hackers who haven't finished inputted checkpoint
router.post("/checkpoint-reminder", async (req, res) => {
  try {
    let { checkpointReminder } = req.body;
    // Define __filename and __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let numCores = os.cpus().length;

    let filter = {};

    if (checkpointReminder == "1") {
      filter[`checkpointsstatus.${Number(checkpointReminder) - 1}`] = { $exists: false };
    } else if (checkpointReminder == "2") {
      filter[`checkpointsstatus.${0}`] = { $exists: true };
      filter[`checkpointsstatus.${Number(checkpointReminder) - 1}`] = { $exists: false };
    } else if (checkpointReminder == "3") {
      filter[`checkpointsstatus.${0}`] = { $exists: true };
      filter[`checkpointsstatus.${1}`] = { $exists: true };
      filter[`checkpointsstatus.${Number(checkpointReminder) - 1}`] = { $exists: false };
    } else if (checkpointReminder == "4") {
      filter[`checkpointsstatus.${0}`] = { $exists: true };
      filter[`checkpointsstatus.${1}`] = { $exists: true };
      filter[`checkpointsstatus.${2}`] = { $exists: true };
      filter[`checkpointsstatus.${Number(checkpointReminder) - 1}`] = { $exists: false };
    }

    //fetch hackers whose bool value is false @ mentioned index (checkpoint)
    let hackersToRemind = await Hacker.find(filter);

    let hackers = hackersToRemind.map((hacker) => {
      return { fullname: hacker.fullname, team: hacker.team, track: hacker.track }
    })

    let data = [];
    for (const hacker of hackers) {
      let teamsData = await Teams.findById(hacker.track).select('teams');
      let teamIds = teamsData.teams;
      let team = teamIds.filter((team) => team._id.toString() == hacker.team)
      // console.log(team);
      data.push({ hacker: hacker.fullname, team: team[0].teamname })
    }

    console.log(data);

    return

    // console.log(hackersToRemind.length);
    // return

    // console.log(checkpointReminder);

    if (!hackersToRemind.length) {
      return res.status(200).json({ success: { msg: "All hackers have completed this checkpoint!" } })
    }

    // console.log(hackersToRemind);

    let workersSpawned = [];
    // slice does not exceed array length (multiples of cores is used to divide workload)

    let workDistributed = numCores < hackersToRemind.length ? Math.ceil(Number(hackersToRemind.length) / numCores) : hackersToRemind.length;

    console.log(`work sent to each core : ${workDistributed}`);

    for (let i = 0; i < numCores; i++) {
      let hackersChunk
      if (hackersToRemind.slice(i * workDistributed, (i + 1) * workDistributed).length) {
        hackersChunk = hackersToRemind.slice(i * workDistributed, (i + 1) * workDistributed);
        console.log(hackersChunk.length);
      } else {
        //to prevent spinning up worker threads wherever not necessary

        break;
      }

      // Spawn a worker and pass the chunk of data
      const workerPromise = new Promise((resolve, reject) => {

        const worker = new Worker(path.join(`${__dirname}`, `../utils/bulkSMSjob.js`), {
          workerData: { hackers: JSON.stringify(hackersChunk), checkpoint: checkpointReminder }
        });

        worker.on('message', (message) => {
          console.log(`Message from worker: ${message}`);
          resolve("completed");
        });

        worker.on('error', (error) => {
          console.log(`Error from worker: ${error}`);
          reject();
        });

        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      });
      console.log(`Request forwarded by main thread. parent PID : ${process.pid}`);

      workersSpawned.push(workerPromise);  // Add worker promise to array
    }

    const results = await Promise.all(workersSpawned);
    console.log(results);
    res.status(200).json({ success: { msg: "Jobs completed!" } })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "The server is currently experiencing difficulties. Please try again.", path: "internalerror" } })
  }
})


router.get("/generate-hacker-data", async (req, res) => {
  try {
    let data = await Hacker.find({});
    let dataSetOne = data.slice(0, data.length);
    // let dataSetTwo = data.slice(100, data.length);
    // let dataSetThree = data.slice(100, data.length);
    for (const hacker of dataSetOne) {
      let teamsData = await Teams.findById(hacker.track).select('teams');
      let teamIds = teamsData.teams;
      let team = teamIds.filter((team) => team._id.toString() == hacker.team)
      console.log(team[0].teamname);
      let values = [hacker.fullname, hacker.username, hacker.email, hacker.phonenumber, team[0].teamname, `${hacker.username}-certificate.pdf`];
      await getAccessToken();
      const accessToken = await redisClient.get("googleSheetsAccessToken");

      const range = `sheet1!A:A`;

      const response = await axios.post(
        `https://sheets.googleapis.com/v4/spreadsheets/1-BtD9ODMv34vnzUizPm5sWPFT6nrjwm2bltMamczzAU/values/${range}:append`,
        {
          values: [values],
        },
        {
          params: {
            valueInputOption: "USER_ENTERED",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // let googleSheetRow = response.data.updates.updatedRange.match(/!(.*?):/)[1];
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "The server is currently experiencing difficulties. Please try again.", path: "internalerror" } })
  }
})

export default router;
