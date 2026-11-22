// Importa la clase BasePage desde el archivo BasePage
import { BasePage } from './BasePage';

// Declara y exporta la clase FindOwnersPage que extiende de BasePage
export class FindOwnersPage extends BasePage {
  // En esta pantalla la etiqueta "Last name" no está ligada al campo,
  // pero es el único textbox de la página
  // Define un campo privado que localiza el input de apellido por su rol textbox
  private lastNameInput = this.page.getByRole('textbox');
  // Define un campo privado que localiza el botón Find Owner por su rol y nombre
  private findOwnerButton = this.page.getByRole('button', { name: 'Find Owner' });
  // Define un campo privado que localiza las filas de owners
  private ownerRows = this.page
    // Obtiene todos los elementos con rol row
    .getByRole('row')
    // Filtra las filas que contienen al menos un link
    .filter({ has: this.page.getByRole('link') });

  // Declara un método asíncrono llamado open para abrir la página
  async open() {
    // Navega a la ruta raíz usando el método heredado de BasePage
    await this.goto('');
    // Usa el navbar para navegar a la opción Search de Owners
    await this.navbar.goToOwnersSearch();
    // Espera a que la página termine de cargar usando el método propio
    await this.waitUntilLoaded();
  }

  // La pantalla carga primero la lista completa de owners.
  // Si buscamos antes de que termine, esa carga puede pisar el resultado.
  // Declara un método asíncrono que espera a que la pantalla esté cargada
  async waitUntilLoaded() {
    // Espera a que el input de apellido esté presente
    await this.lastNameInput.waitFor();
    // Espera a que la primera fila de owners esté presente
    await this.ownerRows.first().waitFor();
  }

  // Esperamos la respuesta del servidor a la búsqueda antes de seguir
  // Declara un método asíncrono para buscar por apellido recibiendo un string
  async searchByLastName(lastName: string) {
    // Rellena el input de apellido con el valor recibido
    await this.lastNameInput.fill(lastName);
    // Espera en paralelo la respuesta del servidor y el clic del botón
    await Promise.all([
      // Espera la respuesta que cumpla con las condiciones dadas
      this.page.waitForResponse(
        // Define la función que valida si la respuesta es la esperada
        (r) =>
          // Verifica que el método de la petición sea GET
          r.request().method() === 'GET' &&
          // Verifica que la URL incluya el apellido codificado
          r.url().includes(encodeURIComponent(lastName)),
      ),
      // Hace clic en el botón Find Owner
      this.findOwnerButton.click(),
    ]);
  }
}