import { Donation } from "../../Domain/Entity/Donation";
import DonationsInterface from "../../Domain/Port/DonationsInterface";
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";


export default class UserMysqlRepository implements DonationsInterface {
  async addDonation(donation: Donation): Promise<Donation | any> {
    const sql = "INSERT INTO Donations (id_company, status, id_association) VALUES (?, ?, ?)";
    const params = [donation.id_company, donation.status, donation.id_association];

    let connection;
    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [result]: any = await query(sql, params, connection);
      if (result && result.insertId) {
        await connection.commit();
        return {
          id: result.insertId,
          id_company: donation.id_company,
          status: donation.status,
          id_association: donation.id_association,
        };
      }
      await connection.rollback();
      return false;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.error("Error al agregar donación:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  confirmDonation(id: number): Promise<Donation | any> {
    throw new Error("Method not implemented.");
  }

  async getDonations(): Promise<Donation[] | any> {
    const sql = "SELECT * FROM Donations";
    const params: any[] = [];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener donations:", error);
      return [];
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  getDonationsbyCompany(company_id: number): Promise<Donation[] | any> {
    throw new Error("Method not implemented.");
  }
  getDonationstoAssociation(association_id: number): Promise<Donation[] | any> {
    throw new Error("Method not implemented.");
  }
}