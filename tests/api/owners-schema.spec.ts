// Importa test y expect desde el archivo de fixtures de API
import { test, expect } from "@fixtures/apiFixtures";
// Importa los esquemas ownerSchema y ownersListSchema desde el alias de esquemas de API
import { ownerSchema, ownersListSchema } from "@api/schemas/ownerSchema";
// Importa la clase OwnerBuilder desde el alias de builders de datos
import { OwnerBuilder } from "@data/builders/OwnerBuilder";

// Inicia un bloque describe para agrupar los tests de contratos de owners con tag @api
test.describe("Contratos de owners", { tag: "@api" }, () => {
  // Declara un test que verifica que la lista de owners cumpla el esquema esperado
  test("la lista de owners debe cumplir el esquema esperado", async ({ ownersApi }) => {
    // Obtiene todos los owners usando el método getAll de ownersApi
    const response = await ownersApi.getAll();
    // Convierte el cuerpo de la respuesta a JSON
    const owners = await response.json();

    // Valida la lista de owners contra el esquema usando safeParse
    const result = ownersListSchema.safeParse(owners);
    // Verifica que la validación del esquema haya sido exitosa
    expect(result.success).toBeTruthy();
  });

  // Declara un test que verifica que un owner creado cumpla el esquema esperado
  test("un owner creado debe cumplir el esquema esperado", async ({ ownersApi }) => {
    // Crea un nuevo owner usando el builder con el firstName 'Abel'
    const newOwner = new OwnerBuilder().withFirstName("Abel").build();
    // Envía la petición para crear el owner usando ownersApi
    const response = await ownersApi.create(newOwner);
    // Convierte el cuerpo de la respuesta a JSON con el owner creado
    const created = await response.json();

    // Valida el owner creado contra el esquema usando safeParse
    const result = ownerSchema.safeParse(created);

    // Comprueba si la validación del esquema falló
    if (!result.success) {
      // Imprime en consola el detalle formateado del error de validación
      console.log(result.error.format());
    }

    // Verifica que la validación del esquema haya sido exitosa
    expect(result.success).toBeTruthy();
  });
});
