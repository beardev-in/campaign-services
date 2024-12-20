import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = process.env.ENVIRONMENT;

// Use dotenv with the correct path
dotenv.config({ path: path.join(`${__dirname}`, `../env/${environment}.env`) });