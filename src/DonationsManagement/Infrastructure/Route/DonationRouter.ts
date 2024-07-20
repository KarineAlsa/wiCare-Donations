import  express  from "express";
import {   addDonationController, getDonationsController, confirmDonationController, rankingDonationsController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const donationRouter = express.Router();

donationRouter.post("/",VerifyToken,addDonationController.run.bind(addDonationController));
donationRouter.get("/",VerifyToken,getDonationsController.run.bind(getDonationsController));
donationRouter.put("/:id",VerifyToken,confirmDonationController.run.bind(confirmDonationController));
donationRouter.get("/ranking",VerifyToken,rankingDonationsController.run.bind(rankingDonationsController));

export default donationRouter;