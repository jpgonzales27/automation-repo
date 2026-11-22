// Importa la clase DbClient desde el archivo DbClient en el directorio superior
import { DbClient } from "../DbClient";

// Declara y exporta la clase OwnersQueries
export class OwnersQueries {
  // Define el constructor que recibe un DbClient como propiedad privada
  constructor(private db: DbClient) {}

  // Declara un método asíncrono para buscar owners por apellido
  async findByLastName(lastName: string) {
    // Retorna el resultado de la consulta SQL que busca por last_name
    return this.db.query(
      // Ejecuta la consulta SELECT filtrando por el apellido recibido
      "SELECT * FROM owners WHERE last_name = $1",
      // Pasa el apellido como parámetro de la consulta
      [lastName],
      // Cierra la llamada a query
    );
  }

  // Declara un método asíncrono para buscar un owner por su id
  async findById(id: number) {
    // Ejecuta la consulta SQL que busca por id y guarda las filas resultantes
    const rows = await this.db.query(
      // Ejecuta la consulta SELECT filtrando por el id recibido
      "SELECT * FROM owners WHERE id = $1",
      // Pasa el id como parámetro de la consulta
      [id],
      // Cierra la llamada a query
    );
    // Retorna la primera fila o null si no existe
    return rows[0] ?? null;
  }

  // Declara un método asíncrono para borrar owners por apellido
  async deleteByLastName(lastName: string) {
    // Retorna el resultado de la consulta SQL que elimina por last_name
    return this.db.query(
      // Ejecuta la consulta DELETE filtrando por el apellido recibido
      "DELETE FROM owners WHERE last_name = $1",
      // Pasa el apellido como parámetro de la consulta
      [lastName],
      // Cierra la llamada a query
    );
  }
}
