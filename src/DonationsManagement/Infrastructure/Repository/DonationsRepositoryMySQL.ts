import { Donation } from "../../Domain/Entity/Donation";
import DonationsInterface from "../../Domain/Port/DonationsInterface";
import query from "../../Database/mysql";
import { connection_pool } from "../../Database/mysql";


export default class UserMysqlRepository implements DonationsInterface {
  async rankingDonations(): Promise<Donation[] | any> {
    const sql = `SELECT id_company, COUNT(*) AS total_donaciones FROM Donations WHERE status = 'Confirmed'
                  GROUP BY id_company ORDER BY total_donaciones DESC;`;
    const params: any[] = [];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        await connection.release();
        return false;
      }
      await connection.release();
      return result;
    } catch (error) {
      console.error("Error al obtener donaciones:", error);
      if (connection) {
        await connection.release();
      }
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async getDonationsAssociationPendings(association_id: number): Promise<Donation[] | any> {
    const sql = "SELECT * FROM Donations WHERE id_association = ? AND status = 'Pending'";
    const params = [association_id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        await connection.release();
        return false;
      }
      await connection.release();
      return result;
    } catch (error) {
      console.error("Error al obtener donaciones pendientes de la asociación:", error);
      if (connection) {
        await connection.release();
      }
      
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
  async getDonationsAssociationConfirmed(association_id: number): Promise<Donation[] | any> {
    const sql = "SELECT * FROM Donations WHERE id_association = ? AND status = 'Confirmed'";
    const params = [association_id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      const [result]: any = await query(sql, params, connection);
      if (result.length === 0) {
        await connection.release();
        return false;
      }
      return result;
    } catch (error) {
      console.error("Error al obtener donaciones confirmadas de la asociación:", error);
      if (connection) {
        await connection.release();
      }
      
    } finally {
      if (connection) {
        connection.release();
        console.log("Conexión cerrada");
      }
    }
  }
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
      await connection.release();
      return false;
    } catch (error) {
      if (connection) {
        await connection.rollback();
        await connection.release();
      }
      console.error("Error al agregar donación:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  async confirmDonation(id: number): Promise<Donation | any> {
    const sql = "UPDATE Donations SET status = 'Confirmed' WHERE id = ?";
    const params = [id];
    let connection;
    try {
      connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [result]: any = await query(sql, params, connection);
      if (result && result.affectedRows > 0) {
        await connection.commit();
        return {
          id: id,
          status: "Confirmed",
        };
      }
      await connection.rollback();
      return false;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.error("Error al confirmar donación:", error);
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
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