import express from "express";
import dotenv from 'dotenv'
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';
import https from 'https';
import donationRouter from "./DonationsManagement/Infrastructure/Route/DonationRouter";
import { consumeMessages } from "./DonationsManagement/Infrastructure/Service/SagaConsumer";
dotenv.config()
const server = express();
const server_port =process.env.PORT;
server.use(express.json());
server.use('/', donationRouter);


async function startServer() {

    consumeMessages();
    const httpsOptions = {
        key: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/wicare-donations.ddns.net/privkey.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/wicare-donations.ddns.net/fullchain.pem')),
    };

    https.createServer(httpsOptions, server).listen(server_port, () => {
        console.log(`Server listening on https://localhost:${server_port}/`);
    });
    

}

startServer();
