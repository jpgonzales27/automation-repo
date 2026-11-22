// Importa la clase ApiClient desde el archivo ApiClient
import { ApiClient } from "./ApiClient";
// Importa el tipo Owner desde el alias de builders de datos
import { Owner } from "@data/builders/OwnerBuilder";

// Declara y exporta la clase OwnersApi
export class OwnersApi {
  // Define el constructor que recibe un ApiClient como propiedad privada
  constructor(private client: ApiClient) {}

  // Declara un método asíncrono para obtener todos los owners
  async getAll() {
    // Realiza una petición GET a la ruta /owners
    return this.client.get("/owners");
  }

  // Declara un método asíncrono para obtener un owner por su id
  async getById(id: number) {
    // Realiza una petición GET a la ruta /owners con el id recibido
    return this.client.get(`/owners/${id}`);
  }

  // Declara un método asíncrono para crear un owner recibiendo el objeto
  async create(owner: Owner) {
    // Realiza una petición POST a /owners enviando el owner
    return this.client.post("/owners", owner);
  }

  // PUT reemplaza el recurso: hay que mandar el owner completo
  // Declara un método asíncrono para actualizar un owner por su id
  async update(id: number, owner: Owner) {
    // Realiza una petición PUT a /owners con el id enviando el owner completo
    return this.client.put(`/owners/${id}`, owner);
  }

  // Declara un método asíncrono para eliminar un owner por su id
  async delete(id: number) {
    // Realiza una petición DELETE a /owners con el id recibido
    return this.client.delete(`/owners/${id}`);
  }
}
