import path from 'path';
import { fileURLToPath } from "url";
import fs from "fs";
import redisClient from "./redis.js";
import jwt from 'jsonwebtoken';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyFilePath = path.join(__dirname, './xcrosshack-a60b1a894b5f.json');
const serviceAccountKey = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

async function getAccessToken() {
try{
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: createJwt(serviceAccountKey),
    });
    const response = await axios.post(tokenUrl, data, { headers });
  
    await redisClient.set(`googleSheetsAccessToken`, response.data.access_token);
}catch(error){
    console.log(error);
}
}

function createJwt(serviceAccountKey) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccountKey.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const token = jwt.sign(payload, serviceAccountKey.private_key, { algorithm: 'RS256' });
  return token;
}

export default getAccessToken;