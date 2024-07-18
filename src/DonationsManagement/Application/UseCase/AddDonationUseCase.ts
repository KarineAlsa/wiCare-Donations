import { Donation } from "../../Domain/Entity/Donation";
import  CompanyInterface  from "../../Domain/Port/DonationsInterface";

export default class AddDonationUseCase {

    constructor(readonly repository:CompanyInterface) {}

    async run( {id_company, status, id_association}: {
        id_company:number,
        status:string,
        id_association:number
        
      } ):Promise<Donation|any> {
        try {

            let donation = new Donation(
                id_company,
                status,
                id_association
            );
            return await this.repository.addDonation(donation);
            
        }catch(error) {

        }
    }

}