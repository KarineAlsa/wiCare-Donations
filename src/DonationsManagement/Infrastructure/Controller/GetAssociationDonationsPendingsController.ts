import { Request, Response } from "express";
import  GetAllDonationsUseCase  from "../../Application/UseCase/GetAssociationDonationsPendingsUseCase";

export default class GetAssociationDonationsPendingsController {

    constructor(readonly useCase:GetAllDonationsUseCase){}

    async run(request:Request,response:Response) {
        const association_id = request.params.id;
        try {
            
            let donatino = await this.useCase.run(Number(association_id));

            if (donatino) {
                
                if (donatino) {
                    return response.status(200).json({data:donatino,message:"All donations",success:true});
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
    