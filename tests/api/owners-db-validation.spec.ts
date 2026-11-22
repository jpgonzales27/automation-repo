// Importa test renombrado como apiTest desde el archivo de fixtures de API
import { test as apiTest } from "@fixtures/apiFixtures";
// Importa test renombrado como dbTest desde el archivo de fixtures de base de datos
import { test as dbTest } from "@fixtures/dbFixtures";
// Importa mergeTests y expect desde Playwright
import { mergeTests, expect } from "@playwright/test";
// Importa la clase OwnerBuilder desde el alias de builders de datos
import { OwnerBuilder } from "@data/builders/OwnerBuilder";

// Combina los tests de API y de base de datos en un solo test
const test = mergeTests(apiTest, dbTest);

// Inicia un bloque describe para agrupar los tests de consistencia API → Base de datos
test.describe("Consistencia API → Base de datos", { tag: "@db" }, () => {
  // Declara un test que verifica que un owner creado por API exista en la base de datos
  test("un owner creado por API debe existir en la base de datos", async ({
    // Recibe la fixture ownersApi del contexto del test
    ownersApi,
    // Recibe la fixture ownersQueries del contexto del test
    ownersQueries,
    // Recibe la fixture trackOwnerForCleanup del contexto del test
    trackOwnerForCleanup,
  }) => {
    // Crea un nuevo owner usando el builder con el firstName 'Abel'
    const newOwner = new OwnerBuilder().withFirstName("Abel").build();
    // Registra el apellido ANTES de crear el owner (así limpia incluso si falla)
    trackOwnerForCleanup(newOwner.lastName);

    // Envía la petición para crear el owner usando ownersApi
    const response = await ownersApi.create(newOwner);
    // Verifica que el status de la respuesta sea 201
    expect(response.status()).toBe(201);

    // Consulta la base de datos por el apellido del owner creado
    const dbRecords = await ownersQueries.findByLastName(newOwner.lastName);
    // Verifica que exista exactamente 1 registro en la base de datos
    expect(dbRecords.length).toBe(1);
  });

  // Declara un test que verifica que el teléfono del owner se haya persistido correctamente
  test("el owner debe tener el teléfono persistido correctamente", async ({
    // Recibe la fixture ownersApi del contexto del test
    ownersApi,
    // Recibe la fixture ownersQueries del contexto del test
    ownersQueries,
    // Recibe la fixture trackOwnerForCleanup del contexto del test
    trackOwnerForCleanup,
  }) => {
    // Crea un nuevo owner usando el builder con el firstName 'Abel'
    const newOwner = new OwnerBuilder().withFirstName("Abel").build();
    // Registra el apellido para limpiarlo al terminar el test
    trackOwnerForCleanup(newOwner.lastName);

    // Envía la petición para crear el owner usando ownersApi
    await ownersApi.create(newOwner);

    // Busca en la base de datos por el apellido del owner creado usando ownersQueries
    const dbRecords = await ownersQueries.findByLastName(newOwner.lastName);

    // Verifica que el teléfono en la base de datos coincida con el del owner creado
    expect(dbRecords[0].telephone).toBe(newOwner.telephone);
  });
});
