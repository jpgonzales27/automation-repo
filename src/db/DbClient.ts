// Importa Pool desde la librería pg para manejar el pool de conexiones a PostgreSQL
import { Pool } from "pg";
// Importa el objeto config desde el alias de configuración de entorno
import { config } from "@config/env";

// Declara y exporta la clase DbClient
export class DbClient {
  // Define un campo privado pool del tipo Pool
  private pool: Pool;

  // Define el constructor de la clase
  constructor() {
    // Inicializa el pool con una nueva instancia de Pool y la configuración de la BD
    this.pool = new Pool({
      // Establece el host de la base de datos desde la configuración
      host: config.db.host,
      // Establece el puerto de la base de datos desde la configuración
      port: config.db.port,
      // Establece el nombre de la base de datos desde la configuración
      database: config.db.name,
      // Establece el usuario de la base de datos desde la configuración
      user: config.db.user,
      // Establece la contraseña de la base de datos desde la configuración
      password: config.db.password,
    });
  }

  // Declara un método asíncrono genérico para ejecutar consultas SQL
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    // Ejecuta la consulta SQL con los parámetros usando el pool
    const result = await this.pool.query(sql, params);
    // Retorna las filas del resultado de la consulta
    return result.rows;
  }

  // Declara un método asíncrono para cerrar el pool de conexiones
  async close() {
    // Finaliza el pool de conexiones de la base de datos
    await this.pool.end();
  }
}
