// Importa la clase BasePage desde el archivo BasePage
import { BasePage } from './BasePage';

// Declara y exporta un tipo OwnerFormData con los campos del formulario de owner
export type OwnerFormData = {
  // Define el campo firstName como string
  firstName: string;
  // Define el campo lastName como string
  lastName: string;
  // Define el campo address como string
  address: string;
  // Define el campo city como string
  city: string;
  // Define el campo telephone como string
  telephone: string;
};

// Declara y exporta la clase AddOwnerPage que extiende de BasePage
export class AddOwnerPage extends BasePage {
  // Declara un método asíncrono llamado open para abrir la página
  async open() {
    // Navega a la ruta raíz usando el método heredado de BasePage
    await this.goto('');
    // Usa el navbar para navegar a la opción Add New de Owners
    await this.navbar.goToOwnersAdd();
    // Espera a que el botón Add Owner esté presente en la página
    await this.page.getByRole('button', { name: 'Add Owner' }).waitFor();
  }

  // Declara un método asíncrono para rellenar el formulario con los datos del owner
  async fillOwnerForm(owner: OwnerFormData) {
    // Rellena el campo First Name con el valor del owner
    await this.page.getByLabel('First Name').fill(owner.firstName);
    // Rellena el campo Last Name con el valor del owner
    await this.page.getByLabel('Last Name').fill(owner.lastName);
    // Rellena el campo Address con el valor del owner
    await this.page.getByLabel('Address').fill(owner.address);
    // Rellena el campo City con el valor del owner
    await this.page.getByLabel('City').fill(owner.city);
    // Rellena el campo Telephone con el valor del owner
    await this.page.getByLabel('Telephone').fill(owner.telephone);
  }

  // Esperamos la respuesta del servidor antes de seguir: evita que el test se adelante
  // Declara un método asíncrono para enviar el formulario
  async submit() {
    // Espera en paralelo la respuesta del servidor y el clic del botón
    await Promise.all([
      // Espera la respuesta que cumpla con las condiciones dadas
      this.page.waitForResponse(
        // Define la función que valida si la respuesta es la esperada
        (r) => r.url().includes('/api/owners') && r.request().method() === 'POST',
      ),
      // Hace clic en el botón Add Owner
      this.page.getByRole('button', { name: 'Add Owner' }).click(),
    ]);
  }

  // Declara un método asíncrono para registrar un owner completo
  async register(owner: OwnerFormData) {
    // Rellena el formulario con los datos del owner recibido
    await this.fillOwnerForm(owner);
    // Envía el formulario esperando la respuesta del servidor
    await this.submit();
  }
}