// Importa test renombrado como base desde Playwright para extenderlo con fixtures
import { test as base } from "@playwright/test";
// Importa la clase ApiClient desde el alias de API
import { ApiClient } from "@api/ApiClient";
// Importa la clase OwnersApi desde el alias de API
import { OwnersApi } from "@api/OwnersApi";

// Declara un tipo ApiFixtures que define las fixtures de API disponibles
type ApiFixtures = {
  // Define la fixture apiClient del tipo ApiClient
  apiClient: ApiClient;
  // Define la fixture ownersApi del tipo OwnersApi
  ownersApi: OwnersApi;
};

// Exporta el test extendido con las fixtures del tipo ApiFixtures
export const test = base.extend<ApiFixtures>({
  // Define la fixture apiClient como función asíncrona que recibe request y use
  apiClient: async ({ request }, use) => {
    // Provee una nueva instancia de ApiClient usando el request del contexto
    await use(new ApiClient(request));
  },
  // Define la fixture ownersApi como función asíncrona que recibe apiClient y use
  ownersApi: async ({ apiClient }, use) => {
    // Provee una nueva instancia de OwnersApi usando el apiClient
    await use(new OwnersApi(apiClient));
  },
});

// Reexporta expect desde Playwright para usarlo en los tests
export { expect } from "@playwright/test";
