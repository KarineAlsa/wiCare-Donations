import { Donation } from "../../Domain/Entity/Donation";
import  DonationsInterface  from "../../Domain/Port/DonationsInterface";


export default class ConfirmDonationUseCase {

    constructor(readonly repository:DonationsInterface) {}

    async run(id:number):Promise<Donation|any> {
        try {

            return await this.repository.confirmDonation(id);

        }catch(error) {

        }
    }

}