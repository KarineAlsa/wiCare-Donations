import express from "express";
import dotenv from 'dotenv'
import path from 'path';
import { exec } from 'child_process';
import donationRouter from "./DonationsManagement/Infrastructure/Route/DonationRouter";

dotenv.config()
const server = express();
const server_port =process.env.PORT;
server.use(express.json());
server.use('/', donationRouter);


async function startServer() {

    server.listen(server_port, () => {
        console.log(`Server listening on http://localhost:${server_port}/`);
    });
    

}

startServer();
