import  express  from "express";
import {   addDonationController, getDonationsController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const donationRouter = express.Router();

donationRouter.post("/",VerifyToken,addDonationController.run.bind(addDonationController));
donationRouter.get("/",VerifyToken,getDonationsController.run.bind(getDonationsController));


export default donationRouter;