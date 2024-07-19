import { Donation } from "../../Domain/Entity/Donation";
import  DonationsInterface  from "../../Domain/Port/DonationsInterface";

export default class GetAssociationDonationsPendingsUseCase {

    constructor(readonly repository:DonationsInterface) {}

    async run(association_id:number):Promise<Donation[]|any> {
        try {

            return await this.repository.getDonationsAssociationPendings(association_id);
            
        }catch(error) {

        }
    }

}