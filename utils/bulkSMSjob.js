import process from "process";
import {parentPort, workerData} from "worker_threads";
import checkpointReminder0xHackingMsg from "../services/0xhacking-checkpoint-reminder-msg91.js";
import checkpointReminder0xHackingFast from "../services/0xhacking-checkpoint-reminder-fast2sms.js";

async function sendBulkSMS(){
    try{
        let hackersData = JSON.parse(workerData.hackers), checkPoint = JSON.parse(workerData.checkpoint), failed = [];
        for(const hacker of hackersData){
            // to know precisely if something failed 
            let smsResult = await checkpointReminder0xHackingMsg(hacker.phonenumber, checkPoint);
            if (!(smsResult.type === "success" || smsResult.return)){
                failed.push(hacker.phonenumber);
            } 
            // console.log(hacker.username);
        }
        if(failed.length){
            console.log(`messages to following number failed : \n ${failed}`);
        }else{
            console.log(`All reminders sent succesfully!`);
        }
        return "completed";
    }catch(error){
        return error;
    }   
}

(async () => {
    try {
        const result = await sendBulkSMS();
        if(result == "completed"){
            //logs are being sent to buffer to avoid worker thread communication inturuptions.
            console.log(`Worker PID - (${process.pid}) handled task`);
            //event loop prioritises event emissions
            parentPort.postMessage(`Worker Result: ${result}, PID: ${process.pid}`);
        }else{
            console.log(`sendBulkSMS failure : ${result}`);
        }
    } catch (error) {
        throw new Error
    }
})();
