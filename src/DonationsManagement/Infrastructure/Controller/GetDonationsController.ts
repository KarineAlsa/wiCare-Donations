import { Request, Response } from "express";
import  GetAllDonationsUseCase  from "../../Application/UseCase/GetAllDonationsUseCase";
import sendMessageAndWaitForResponse from "../Service/SagaMessaging";

export default class GetDonationsController {

    constructor(readonly useCase:GetAllDonationsUseCase){}

    async run(request:Request,response:Response) {
        
        try {
            
            let donatino = await this.useCase.run();

            if (donatino) {
                let donation = await sendMessageAndWaitForResponse("getAllDonations",donatino)
                if (donation) {
                    return response.status(200).json({data:donation,message:"All donations",success:true});
                }
                else {
                    response.status(400).send({
                        
                        message: "No se pudo recuperar donaciones",
                        success: false,
                    });
                }

            } else {
                response.status(400).send({
                    
                    message: "No se pudo recuperar donaciones",
                    success: false,
                });
            }
        } catch (error:any) {
            console.log(error)
            response.status(500).send({
                
                message: "Ha ocurrido un error durante su petición.",
                success:false
            });
        }
    } 
    }
    