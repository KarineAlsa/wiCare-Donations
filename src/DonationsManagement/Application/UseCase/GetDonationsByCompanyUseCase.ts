import { Donation } from "../../Domain/Entity/Donation";
import  DonationsInterface  from "../../Domain/Port/DonationsInterface";

export default class GetDonationsbyCompanyUseCase {

    constructor(readonly repository:DonationsInterface) {}

    async run(company_id:number):Promise<Donation[]|any> {
        try {

            return await this.repository.getDonationsbyCompany(company_id);
            
        }catch(error) {

        }
    }

}