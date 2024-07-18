import { Donation } from "../../Domain/Entity/Donation";
import  DonationsInterface  from "../../Domain/Port/DonationsInterface";

export default class GetDonationsToAssociationUseCase {

    constructor(readonly repository:DonationsInterface) {}

    async run(association_id:number):Promise<Donation[]|any> {
        try {

            return await this.repository.getDonationstoAssociation(association_id);
            
        }catch(error) {

        }
    }

}