import { Donation } from "../../Domain/Entity/Donation";
import  DonationsInterface  from "../../Domain/Port/DonationsInterface";

export default class GetAssociationDonationsConfirmedUseCase {

    constructor(readonly repository:DonationsInterface) {}

    async run(association_id:number):Promise<Donation[]|any> {
        try {

            return await this.repository.getDonationsAssociationConfirmed(association_id);
            
        }catch(error) {

        }
    }

}