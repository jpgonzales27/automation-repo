// Importa test renombrado como base desde Playwright para extenderlo con fixtures
import { test as base } from "@playwright/test";
// Importa la clase DbClient desde el alias de base de datos
import { DbClient } from "@db/DbClient";
// Importa la clase OwnersQueries desde el alias de queries de base de datos
import { OwnersQueries } from "@db/queries/ownersQueries";

// Declara un tipo DbFixtures que define las fixtures de base de datos disponibles
type DbFixtures = {
  // Define la fixture db del tipo DbClient
  db: DbClient;
  // Define la fixture ownersQueries del tipo OwnersQueries
  ownersQueries: OwnersQueries;
  // Define la fixture trackOwnerForCleanup como función que recibe un lastName
  trackOwnerForCleanup: (lastName: string) => void;
};

// Exporta el test extendido con las fixtures del tipo DbFixtures
export const test = base.extend<DbFixtures>({
  // Define la fixture db como función asíncrona que recibe un objeto vacío y use
  db: async ({}, use) => {
    // Crea una nueva instancia de DbClient
    const db = new DbClient();
    // Provee la instancia de DbClient al test
    await use(db);
    // Cierra la conexión de la base de datos al terminar el test
    await db.close();
  },
  // Define la fixture ownersQueries como función asíncrona que recibe db y use
  ownersQueries: async ({ db }, use) => {
    // Provee una nueva instancia de OwnersQueries usando la conexión db
    await use(new OwnersQueries(db));
  },
  // Define la fixture trackOwnerForCleanup como función asíncrona que recibe ownersQueries y use
  trackOwnerForCleanup: async ({ ownersQueries }, use) => {
    // Inicializa un arreglo vacío para guardar los apellidos a limpiar
    const lastNamesToClean: string[] = [];

    // Provee al test una función que agrega apellidos al arreglo de limpieza
    await use((lastName: string) => {
      // Agrega el apellido recibido al arreglo de apellidos a limpiar
      lastNamesToClean.push(lastName);
    });

    // Itera sobre cada apellido registrado para limpiarlo al terminar el test
    for (const lastName of lastNamesToClean) {
      // Elimina de la base de datos los owners con ese apellido
      await ownersQueries.deleteByLastName(lastName);
    }
  },
});

// Reexporta expect desde Playwright para usarlo en los tests
export { expect } from "@playwright/test";
