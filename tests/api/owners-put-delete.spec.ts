// Importa test y expect desde el archivo de fixtures de API
import { test, expect } from "@fixtures/apiFixtures";
// Importa la clase OwnerBuilder desde el alias de builders de datos
import { OwnerBuilder } from "@data/builders/OwnerBuilder";

// Inicia un bloque describe para agrupar los tests de PUT y DELETE /owners con tag @api
test.describe("PUT y DELETE /owners", { tag: "@api" }, () => {
  // Declara un test que verifica actualizar un owner existente
  test("debe actualizar un owner existente", async ({ ownersApi }) => {
    // Crea un owner original usando el builder con el firstName 'Abel'
    const original = new OwnerBuilder().withFirstName("Abel").build();
    // Envía la petición para crear el owner original y guarda la respuesta
    const createResponse = await ownersApi.create(original);
    // Convierte el cuerpo de la respuesta a JSON con el owner creado
    const created = await createResponse.json();

    // Crea los datos actualizados copiando el original y cambiando la city a 'Monona'
    const updatedData = { ...original, city: "Monona" };
    // Envía la petición para actualizar el owner por su id con los nuevos datos
    const updateResponse = await ownersApi.update(created.id, updatedData);

    // Verifica que el status de la respuesta de actualización sea 204
    expect(updateResponse.status()).toBe(204);

    // Consulta el owner actualizado por su id usando ownersApi
    const getResponse = await ownersApi.getById(created.id);
    // Convierte el cuerpo de la respuesta a JSON con el owner consultado
    const fetched = await getResponse.json();

    // Verifica que la city del owner consultado sea 'Monona'
    expect(fetched.city).toBe("Monona");
    // Verifica que el lastName del owner consultado coincida con el original
    expect(fetched.lastName).toBe(original.lastName);
  });

  // Declara un test que verifica borrar un owner y ya no poder consultarlo
  test("debe borrar un owner y ya no poder consultarlo", async ({ ownersApi }) => {
    // Crea un owner usando el builder con el firstName 'Abel'
    const owner = new OwnerBuilder().withFirstName("Abel").build();
    // Envía la petición para crear el owner y guarda la respuesta
    const createResponse = await ownersApi.create(owner);
    // Convierte el cuerpo de la respuesta a JSON con el owner creado
    const created = await createResponse.json();

    // Envía la petición para borrar el owner por su id usando ownersApi
    const deleteResponse = await ownersApi.delete(created.id);
    // Verifica que el status de la respuesta de borrado sea 204
    expect(deleteResponse.status()).toBe(204);

    // Consulta el owner borrado por su id usando ownersApi
    const getResponse = await ownersApi.getById(created.id);
    // Verifica que el status de la respuesta sea 404
    expect(getResponse.status()).toBe(404);
  });

  // Declara un test que verifica regresar 404 al borrar un owner inexistente
  test("debe regresar 404 al borrar un owner que no existe", async ({ ownersApi }) => {
    // Envía la petición para borrar un owner con id inexistente usando ownersApi
    const response = await ownersApi.delete(999999);
    // Verifica que el status de la respuesta sea 404
    expect(response.status()).toBe(404);
  });
});
