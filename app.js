import express from "express";
import "./utils/loadEnv.js"
import "./utils/dbConnect.js"; 
import bulkSMSRouter from "./routes/bulkSMSRouter.js";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json()); //json bodyparser

app.use("/api/hackathon", bulkSMSRouter); 

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
