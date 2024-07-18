export class Donation {
    public id_company:number;
    public status:string;
    public id_association:number;
    public id?:number

    constructor(
        id_company:number,
        status:string,
        id_association:number,
        id?:number
    ) {
        this.id_company = id_company
        this.status = status
        this.id_association = id_association
        this.id = id;
    }
}