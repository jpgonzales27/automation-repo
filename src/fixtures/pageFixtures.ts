// Importa test renombrado como base desde Playwright para extenderlo con fixtures
import { test as base } from "@playwright/test";
// Importa la clase HomePage desde el alias de páginas
import { HomePage } from "@pages/HomePage";
// Importa la clase FindOwnersPage desde el alias de páginas
import { FindOwnersPage } from "@pages/FindOwnersPage";
// Importa la clase OwnersListPage desde el alias de páginas
import { OwnersListPage } from "@pages/OwnersListPage";

// Importa la clase AddOwnerPage desde el alias de páginas
import { AddOwnerPage } from "@pages/AddOwnerPage";

// Importa la clase NavbarComponent desde el alias de componentes
import { NavbarComponent } from "@components/NavbarComponent";

// Declara un tipo Pages que define las fixtures disponibles
type Pages = {
  // Define la fixture homePage del tipo HomePage
  homePage: HomePage;
  // Define la fixture findOwnersPage del tipo FindOwnersPage
  findOwnersPage: FindOwnersPage;
  // Define la fixture ownersListPage del tipo OwnersListPage
  ownersListPage: OwnersListPage;

  // Define la fixture addOwnerPage del tipo AddOwnerPage
  addOwnerPage: AddOwnerPage;

  // Define la fixture navbar del tipo NavbarComponent
  navbar: NavbarComponent;
};

// Exporta el test extendido con las fixtures del tipo Pages
export const test = base.extend<Pages>({
  // Define la fixture homePage como función asíncrona que recibe page y use
  homePage: async ({ page }, use) => {
    // Provee una nueva instancia de HomePage al test
    await use(new HomePage(page));
  },
  // Define la fixture findOwnersPage como función asíncrona que recibe page y use
  findOwnersPage: async ({ page }, use) => {
    // Provee una nueva instancia de FindOwnersPage al test
    await use(new FindOwnersPage(page));
  },
  // Define la fixture ownersListPage como función asíncrona que recibe page y use
  ownersListPage: async ({ page }, use) => {
    // Provee una nueva instancia de OwnersListPage al test
    await use(new OwnersListPage(page));
  },

  // Define la fixture addOwnerPage como función asíncrona que recibe page y use
  addOwnerPage: async ({ page }, use) => {
    // Provee una nueva instancia de AddOwnerPage al test
    await use(new AddOwnerPage(page));
  },

  // Define la fixture navbar como función asíncrona que recibe page y use
  navbar: async ({ page }, use) => {
    // Provee una nueva instancia de NavbarComponent al test
    await use(new NavbarComponent(page));
  },
});

// Reexporta expect desde Playwright para usarlo en los tests
export { expect } from "@playwright/test";
