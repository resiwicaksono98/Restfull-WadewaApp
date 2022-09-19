import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename,)

export const rootpath = path.resolve(__dirname, '../');
export const secretKey = process.env.SECRET_KEY;
export const serviceName = process.env.SERVICE_NAME;
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;
export const dbName = process.env.DB_NAME;
