import { Request, Response } from "express";
import  AddDonationUseCase  from "../../Application/UseCase/AddDonationUseCase";

export default class AddBankAccountController {

    constructor(readonly useCase:AddDonationUseCase){}

    async run(request:Request,response:Response) {
        const {  association_id, company_id} = request.body;
        
        if (!association_id || !company_id) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        
        try {
            
            let donatino = await this.useCase.run({
                id_company: Number(company_id),
                status: "Pendiente",
                id_association: Number(association_id)
            });
            if (donatino) {
                return response.status(200).json({data:donatino,message:"Donation created",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo añadir la donación.",
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
    