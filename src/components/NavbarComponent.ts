// Importa el tipo Page de Playwright para tipar la propiedad page
import { Page } from "@playwright/test";

// Declara y exporta la clase NavbarComponent
export class NavbarComponent {
  // Define el constructor que recibe una instancia de Page como parámetro privado
  constructor(private page: Page) {}

  // En esta app "Owners" es un botón (no un link) que despliega un submenú
  // Define un getter privado que retorna el elemento listitem que contiene el botón Owners
  private get ownersItem() {
    // Retorna el resultado de la búsqueda sobre la página
    return (
      this.page
        // Obtiene todos los elementos con rol listitem
        .getByRole("listitem")
        // Filtra para quedarse con el listitem que contiene el botón Owners
        .filter({ has: this.page.getByRole("button", { name: "Owners" }) })
    );
  }

  // Declara un método privado asíncrono para hacer clic en una opción del menú Owners
  private async clickOwnersOption(name: "Search" | "Add New") {
    // Obtiene el botón Owners por su rol y nombre
    const ownersButton = this.page.getByRole("button", { name: "Owners" });
    // Obtiene el link de la opción deseada dentro del item Owners
    const option = this.ownersItem.getByRole("link", { name });

    // Pasa el mouse por encima del botón Owners para desplegar el submenú
    await ownersButton.hover();
    // Si el submenú no se abrió con el mouse encima, lo abrimos con clic
    // Espera a que la opción sea visible con un timeout de 2000 ms
    await option
      // Configura la espera indicando el estado visible y el timeout
      .waitFor({ state: "visible", timeout: 2000 })
      // Si falla la espera, hace clic en el botón Owners como fallback
      .catch(() => ownersButton.click());
    // Hace clic en la opción del submenú
    await option.click();
  }

  // Declara un método público asíncrono para navegar a la búsqueda de Owners
  async goToOwnersSearch() {
    // Llama al método privado pasando la opción 'Search'
    await this.clickOwnersOption("Search");
  }

  // Declara un método público asíncrono para navegar a agregar un nuevo Owner
  async goToOwnersAdd() {
    // Llama al método privado pasando la opción 'Add New'
    await this.clickOwnersOption("Add New");
  }
}
