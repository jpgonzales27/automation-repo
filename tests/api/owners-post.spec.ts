// Importa test y expect desde el archivo de fixtures de API
import { test, expect } from "@fixtures/apiFixtures";
// Importa la clase OwnerBuilder desde el alias de builders de datos
import { OwnerBuilder } from "@data/builders/OwnerBuilder";

// Inicia un bloque describe para agrupar los tests de POST /owners con el tag @api
test.describe("POST /owners", { tag: "@api" }, () => {
  // Declara un test que verifica crear un owner con datos válidos
  test("debe crear un owner con datos validos", async ({ ownersApi }) => {
    // Crea un nuevo owner usando el builder con el firstName 'Abel'
    const newOwner = new OwnerBuilder().withFirstName("Abel").build();

    // Envía la petición para crear el owner usando ownersApi
    const response = await ownersApi.create(newOwner);

    // Verifica que el status de la respuesta sea 201
    expect(response.status()).toBe(201);

    // Convierte el cuerpo de la respuesta a JSON con el owner creado
    const created = await response.json();
    // Verifica que el firstName del owner creado coincida con el enviado
    expect(created.firstName).toBe(newOwner.firstName);
    // Verifica que el lastName del owner creado coincida con el enviado
    expect(created.lastName).toBe(newOwner.lastName);
    // Verifica que el owner creado tenga la propiedad id
    expect(created).toHaveProperty("id");
  });

  // Declara un test que verifica rechazar la creación sin firstName
  test("debe rechazar la creacion sin firstName", async ({ ownersApi }) => {
    // Crea un owner con valores por defecto usando el builder
    const invalidOwner = new OwnerBuilder().build();
    // Elimina la propiedad firstName del owner para hacerlo inválido
    delete (invalidOwner as any).firstName;

    // Envía la petición para crear el owner inválido usando ownersApi
    const response = await ownersApi.create(invalidOwner as any);

    // Verifica que el status de la respuesta sea 400
    expect(response.status()).toBe(400);
  });

  // Declara un test que verifica que el owner creado pueda consultarse después
  test("el owner creado debe poder consultarse despues", async ({ ownersApi }) => {
    // Crea un nuevo owner usando el builder con el firstName 'Abel'
    const newOwner = new OwnerBuilder().withFirstName("Abel").build();

    // Envía la petición para crear el owner y guarda la respuesta
    const createResponse = await ownersApi.create(newOwner);
    // Convierte el cuerpo de la respuesta a JSON con el owner creado
    const created = await createResponse.json();

    // Consulta el owner por su id usando ownersApi
    const getResponse = await ownersApi.getById(created.id);
    // Convierte el cuerpo de la respuesta a JSON con el owner consultado
    const fetched = await getResponse.json();

    // Verifica que el lastName del owner consultado coincida con el creado
    expect(fetched.lastName).toBe(newOwner.lastName);
  });
});
