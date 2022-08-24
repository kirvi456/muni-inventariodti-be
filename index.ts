import Server from './src/models/server';
import dotenv from 'dotenv';

dotenv.config()

const server = new Server();


if( process.env.MODE && process.env.MODE === 'prod' ) server.startHttps();
else server.start();
