// Importa la clase BasePage desde el archivo BasePage
import { BasePage } from "./BasePage";

// Declara y exporta la clase HomePage que extiende de BasePage
export class HomePage extends BasePage {
  // Declara un método asíncrono llamado open para abrir la página
  async open() {
    // Navega a la ruta raíz usando el método goto heredado de BasePage
    await this.goto("");
    // Espera a que la página termine de cargar usando el método heredado
    await this.waitForPageLoad();
  }
}
