// Importa el tipo Locator de Playwright para tipar los localizadores
import { Locator } from '@playwright/test';
// Importa la clase BasePage desde el archivo BasePage
import { BasePage } from './BasePage';

// Declara y exporta la clase OwnersListPage que extiende de BasePage
export class OwnersListPage extends BasePage {
  // Solo las filas de owners (tienen el link con el nombre).
  // Las filas anidadas de mascotas no tienen link, así que no cuentan.
  // Define un getter público que retorna un Locator con las filas de owners
  get rows(): Locator {
    // Retorna las filas que contienen al menos un link
    return this.page.getByRole('row').filter({ has: this.page.getByRole('link') });
  }

  // Declara un método que retorna un Locator de la fila filtrada por nombre completo
  rowByName(fullName: string): Locator {
    // Retorna las filas filtradas por el texto del nombre completo recibido
    return this.rows.filter({ hasText: fullName });
  }

  // Declara un método asíncrono para abrir el owner por su nombre completo
  async openOwnerByName(fullName: string) {
    // Hace clic en el link que tiene como nombre el nombre completo recibido
    await this.page.getByRole('link', { name: fullName }).click();
  }
}