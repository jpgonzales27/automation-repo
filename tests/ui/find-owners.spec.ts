// Importa test y expect desde el archivo de fixtures de páginas
import { test, expect } from "@fixtures/pageFixtures";

// Inicia un bloque describe para agrupar los tests de búsqueda de owners con tag @ui
test.describe("Busqueda de owners", { tag: "@ui" }, () => {
  // Declara un test que verifica encontrar owners por apellido desde el menú
  test("debe encontrar owners por apellido desde el menu", async ({
    // Recibe la fixture homePage del contexto del test
    homePage,
    // Recibe la fixture navbar del contexto del test
    navbar,
    // Recibe la fixture findOwnersPage del contexto del test
    findOwnersPage,
    // Recibe la fixture ownersListPage del contexto del test
    ownersListPage,
  }) => {
    // Abre la página principal usando el método open de homePage
    await homePage.open();
    // Usa el navbar para navegar a la opción Search de Owners
    await navbar.goToOwnersSearch();
    // Espera a que la página de búsqueda de owners esté cargada
    await findOwnersPage.waitUntilLoaded();
    // Realiza la búsqueda del apellido Davis
    await findOwnersPage.searchByLastName("Davis");

    // En los datos originales de PetClinic hay 2 Davis: Betty y Harold
    // Verifica que la lista de owners tenga exactamente 2 filas
    await expect(ownersListPage.rows).toHaveCount(2);
    // Verifica que la fila del owner Betty Davis sea visible
    await expect(ownersListPage.rowByName("Betty Davis")).toBeVisible();
    // 🆕 Verifica que la fila del owner Harold Davis también sea visible
    await expect(ownersListPage.rowByName("Harold Davis")).toBeVisible();
    // 🆕 Verifica que la URL cambió a la lista de owners tras la búsqueda
    await expect(ownersListPage.page).toHaveURL(/\/owners$/);
    // 🆕 Verifica que el input de búsqueda conserva el apellido buscado
    await expect(findOwnersPage.page.getByRole("textbox")).toHaveValue("Davis");
  });

  // Declara un test que verifica mostrar cero resultados para un apellido inexistente
  test("debe mostrar cero resultados para un apellido inexistente", async ({
    // Recibe la fixture findOwnersPage del contexto del test
    findOwnersPage,
    // Recibe la fixture ownersListPage del contexto del test
    ownersListPage,
  }) => {
    // Abre la página de búsqueda de owners usando el método open
    await findOwnersPage.open();
    // Realiza la búsqueda de un apellido que no existe
    await findOwnersPage.searchByLastName("ApellidoQueNoExiste123");

    // Verifica que la lista de owners tenga cero filas
    await expect(ownersListPage.rows).toHaveCount(0);
    // 🆕 Verifica que se muestre el mensaje de "no encontrado"
    await expect(findOwnersPage.page.getByText(/No owners with LastName starting with/i)).toBeVisible();
  });
  // 🆕 Declara un test que documenta el comportamiento con campo vacío
  test("debe mantener la lista completa cuando se busca con campo vacío", async ({
    // Recibe la fixture findOwnersPage del contexto del test
    findOwnersPage,
    // Recibe la fixture ownersListPage del contexto del test
    ownersListPage,
  }) => {
    // Abre la página de búsqueda de owners
    await findOwnersPage.open();
    // Verifica que el botón "Find Owner" esté habilitado aunque el campo esté vacío
    await expect(findOwnersPage.page.getByRole("button", { name: "Find Owner" })).toBeEnabled();
    // Ejecuta la búsqueda sin escribir nada (campo vacío)
    await findOwnersPage.searchByLastName("");
    // Verifica que la tabla sigue mostrando al menos 1 owner (la lista completa)
    await expect(ownersListPage.rows.first()).toBeVisible();
    // Verifica que la URL NO cambió a una búsqueda filtrada (sigue en /owners)
    await expect(ownersListPage.page).toHaveURL(/\/owners$/);
  });
});
