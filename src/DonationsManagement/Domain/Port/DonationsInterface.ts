import { Donation } from "../Entity/Donation";

export default interface DonationsInterface {
    addDonation(donation: Donation): Promise<Donation|any>;
    confirmDonation(id:number): Promise<Donation|any>;
    getDonations(): Promise<Donation[]|any>;
    getDonationsbyCompany(company_id:number): Promise<Donation[]|any>;
    getDonationstoAssociation(association_id:number): Promise<Donation[]|any>;
    }