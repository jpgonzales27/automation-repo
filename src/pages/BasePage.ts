// Importa el tipo Page de Playwright para tipar la propiedad page
import { Page } from "@playwright/test";
// Importa el componente NavbarComponent desde el alias de componentes
import { NavbarComponent } from "@components/NavbarComponent";

// Declara y exporta la clase abstracta BasePage
export abstract class BasePage {
  // Define el constructor que recibe una instancia de Page como propiedad protegida
  constructor(protected page: Page) {}

  // Define un getter protegido que retorna una instancia de NavbarComponent
  protected get navbar(): NavbarComponent {
    // Retorna una nueva instancia de NavbarComponent pasándole la page actual
    return new NavbarComponent(this.page);
  }

  // PetClinic solo responde en la raíz ("/"): la app carga ahí y navega sola a /petclinic/.
  // Por eso entramos con goto('') y nos movemos con el menú.
  // Declara un método asíncrono para navegar a una ruta con valor por defecto vacío
  async goto(path: string = "") {
    // Navega a la ruta indicada usando el método goto de la page
    await this.page.goto(path);
  }

  // Declara un método asíncrono para esperar a que la página cargue
  async waitForPageLoad() {
    // Espera a que el estado de carga sea 'domcontentloaded'
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Declara un método asíncrono que retorna el título de la página como string
  async getTitle(): Promise<string> {
    // Retorna el título de la página actual
    return this.page.title();
  }

  // Declara un método asíncrono que indica si un selector es visible como booleano
  async isVisible(selector: string): Promise<boolean> {
    // Retorna si el elemento localizado por el selector es visible
    return this.page.locator(selector).isVisible();
  }
}
