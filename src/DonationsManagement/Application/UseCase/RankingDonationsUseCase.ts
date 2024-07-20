import { Donation } from "../../Domain/Entity/Donation";
import  DonationsInterface  from "../../Domain/Port/DonationsInterface";

export default class RankingDonationsUseCase {

    constructor(readonly repository:DonationsInterface) {}

    async run():Promise<Donation[]|any> {
        try {

            return await this.repository.rankingDonations();
            
        }catch(error) {

        }
    }

}