// Importa el tipo APIRequestContext de Playwright para tipar el contexto de peticiones
import { APIRequestContext } from "@playwright/test";
// Importa el objeto config desde el alias de configuración de entorno
import { config } from "@config/env";

// Declara y exporta la clase ApiClient
export class ApiClient {
  // Define el constructor que recibe un APIRequestContext como propiedad privada
  constructor(private request: APIRequestContext) {}

  // Declara un método asíncrono para hacer peticiones GET recibiendo una ruta
  async get(path: string) {
    // Ejecuta la petición GET concatenando la URL base de la API con la ruta
    return this.request.get(`${config.apiBaseUrl}${path}`);
  }

  // Declara un método asíncrono para hacer peticiones POST recibiendo ruta y datos
  async post(path: string, data: object) {
    // Ejecuta la petición POST concatenando la URL base con la ruta y enviando data
    return this.request.post(`${config.apiBaseUrl}${path}`, { data });
  }

  // Declara un método asíncrono para hacer peticiones PUT recibiendo ruta y datos
  async put(path: string, data: object) {
    // Ejecuta la petición PUT concatenando la URL base con la ruta y enviando data
    return this.request.put(`${config.apiBaseUrl}${path}`, { data });
  }

  // Declara un método asíncrono para hacer peticiones DELETE recibiendo una ruta
  async delete(path: string) {
    // Ejecuta la petición DELETE concatenando la URL base de la API con la ruta
    return this.request.delete(`${config.apiBaseUrl}${path}`);
  }
}
