import { Request, Response } from "express";
import  ConfirmDonationUseCase  from "../../Application/UseCase/ConfirmDonationUseCase";

export default class AddBankAccountController {

    constructor(readonly useCase:ConfirmDonationUseCase){}

    async run(request:Request,response:Response) {
        const association_id = request.params.id;
        
    
        try {
            
            let donatino = await this.useCase.run(
                Number(association_id)
            );
            if (donatino) {
                return response.status(200).json({data:donatino,message:"Donation updated",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo actualizar la donación.",
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
    