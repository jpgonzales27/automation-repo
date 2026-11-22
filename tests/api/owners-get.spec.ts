// Importa test y expect desde el archivo de fixtures de API
import { test, expect } from "@fixtures/apiFixtures";

// Inicia un bloque describe para agrupar los tests de GET /owners con el tag @api
test.describe("GET /owners", { tag: "@api" }, () => {
  // Declara un test que verifica regresar 200 y una lista de owners
  test("debe regresar 200 y una lista de owners", async ({ ownersApi }) => {
    // Obtiene todos los owners usando el método getAll de ownersApi
    const response = await ownersApi.getAll();

    // Verifica que el status de la respuesta sea 200
    expect(response.status()).toBe(200);

    // Convierte el cuerpo de la respuesta a JSON
    const owners = await response.json();
    // Verifica que el resultado sea un arreglo
    expect(Array.isArray(owners)).toBeTruthy();
    // Verifica que el arreglo tenga al menos un elemento
    expect(owners.length).toBeGreaterThan(0);
  });

  // Declara un test que verifica la estructura correcta de un owner
  test("debe regresar la estructura correcta de un owner", async ({ ownersApi }) => {
    // Obtiene todos los owners usando el método getAll de ownersApi
    const response = await ownersApi.getAll();
    // Convierte el cuerpo de la respuesta a JSON
    const owners = await response.json();
    // Toma el primer owner del arreglo
    const firstOwner = owners[0];

    // Verifica que el primer owner tenga la propiedad id
    expect(firstOwner).toHaveProperty("id");
    // Verifica que el primer owner tenga la propiedad firstName
    expect(firstOwner).toHaveProperty("firstName");
    // Verifica que el primer owner tenga la propiedad lastName
    expect(firstOwner).toHaveProperty("lastName");
    // Verifica que el primer owner tenga la propiedad address
    expect(firstOwner).toHaveProperty("address");
    // Verifica que el primer owner tenga la propiedad city
    expect(firstOwner).toHaveProperty("city");
    // Verifica que el primer owner tenga la propiedad telephone
    expect(firstOwner).toHaveProperty("telephone");
  });

  // Declara un test que verifica regresar 404 al consultar un owner inexistente
  test("debe regresar 404 al consultar un owner que no existe", async ({ ownersApi }) => {
    // Consulta un owner por un id que no existe usando ownersApi
    const response = await ownersApi.getById(999999);
    // Verifica que el status de la respuesta sea 404
    expect(response.status()).toBe(404);
  });
});
