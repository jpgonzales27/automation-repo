// Importa test y expect desde el archivo de fixtures de páginas
import { test, expect } from "@fixtures/pageFixtures";
// Importa la clase OwnerBuilder desde el alias de builders de datos
import { OwnerBuilder } from "@data/builders/OwnerBuilder";

// Inicia un bloque describe para agrupar los tests de registro de owners con tag @ui
test.describe("Registro de owners", { tag: "@ui" }, () => {
  // Declara un test que verifica registrar un nuevo owner exitosamente
  test("debe registrar un nuevo owner exitosamente", async ({
    // Recibe la fixture addOwnerPage del contexto del test
    addOwnerPage,
    // Recibe la fixture findOwnersPage del contexto del test
    findOwnersPage,
    // Recibe la fixture ownersListPage del contexto del test
    ownersListPage,
  }) => {
    // Crea un nuevo owner usando el builder con el firstName 'Abel'
    const newOwner = new OwnerBuilder().withFirstName("Abel").build();

    // Inicia un paso llamado 'Registrar nuevo owner'
    await test.step("Registrar nuevo owner", async () => {
      // Abre la página de agregar owner usando el método open
      await addOwnerPage.open();
      // Registra el nuevo owner usando el método register
      await addOwnerPage.register(newOwner);
      // Cierra el paso 'Registrar nuevo owner'
    });

    // Inicia un paso llamado 'Verificar que el owner fue guardado'
    await test.step("Verificar que el owner fue guardado", async () => {
      // Abre la página de búsqueda de owners usando el método open
      await findOwnersPage.open();
      // Busca por el apellido del nuevo owner creado
      await findOwnersPage.searchByLastName(newOwner.lastName);

      // Verifica que la lista de owners tenga exactamente 1 fila
      await expect(ownersListPage.rows).toHaveCount(1);
      // Verifica que la fila del nuevo owner sea visible
      await expect(
        // Construye el nombre completo con 'Abel' y el apellido del nuevo owner
        ownersListPage.rowByName(`Abel ${newOwner.lastName}`),
        // Comprueba que el elemento sea visible
      ).toBeVisible();
      // 🆕 Verifica que la URL cambió a la lista de owners (confirmación de registro)
      await expect(ownersListPage.page).toHaveURL(/\/owners$/);
      // Cierra el paso 'Verificar que el owner fue guardado'
    });
  });

  // 🆕 Declara un test que verifica rechazar un owner con apellido inválido
  test("debe rechazar un owner con apellido inválido", async ({
    // Recibe la fixture addOwnerPage del contexto del test
    addOwnerPage,
  }) => {
    // Abre la página de agregar owner usando el método open
    await addOwnerPage.open();
    // Rellena el campo First Name con un nombre válido
    await addOwnerPage.page.getByLabel("First Name").fill("Abel");
    // Rellena el campo Last Name con un apellido inválido (contiene números)
    await addOwnerPage.page.getByLabel("Last Name").fill("Owner123");
    // Rellena el campo Address con una dirección válida
    await addOwnerPage.page.getByLabel("Address").fill("123 Main St");
    // Rellena el campo City con una ciudad válida
    await addOwnerPage.page.getByLabel("City").fill("Madison");
    // Rellena el campo Telephone con un teléfono válido
    await addOwnerPage.page.getByLabel("Telephone").fill("1234567890");
    // Verifica que el botón "Add Owner" esté deshabilitado por el apellido inválido
    await expect(addOwnerPage.page.getByRole("button", { name: "Add Owner" })).toBeDisabled();
    // Verifica que se muestre el mensaje de error del apellido
    await expect(addOwnerPage.page.getByText("Last name must consist of letters only")).toBeVisible();
  });
});
