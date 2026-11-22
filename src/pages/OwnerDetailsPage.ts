// Importa la clase BasePage desde el archivo BasePage
import { BasePage } from './BasePage';

// Declara y exporta la clase OwnerDetailsPage que extiende de BasePage
export class OwnerDetailsPage extends BasePage {
  // El nombre completo del owner se muestra en un <b class="ownerFullName">
  // dentro de la fila "Name" de la tabla "Owner Information"
  // Define un campo privado que localiza el elemento con el nombre completo del owner
  private ownerFullName = this.page.locator('.ownerFullName');
  // Cada mascota se renderiza como un componente <app-pet-list>
  // Define un campo privado que localiza todas las tarjetas de mascotas
  private petItems = this.page.locator('app-pet-list');
  // Define un campo privado que localiza el botón Add New Pet por su rol y nombre
  private addNewPetButton = this.page.getByRole('button', { name: 'Add New Pet' });

  // Declara un método asíncrono que espera a que la pantalla esté cargada
  async waitUntilLoaded() {
    // Espera a que el nombre completo del owner esté presente
    await this.ownerFullName.waitFor();
    // Espera a que el botón Add New Pet esté presente
    await this.addNewPetButton.waitFor();
  }

  // Declara un método asíncrono que retorna el nombre completo del owner como string
  async getFullName(): Promise<string> {
    // Retorna el texto del elemento con el nombre completo, sin espacios extra
    return (await this.ownerFullName.textContent())?.trim() ?? '';
  }

  // Declara un método asíncrono que retorna la cantidad de mascotas del owner
  async countPets(): Promise<number> {
    // Cuenta los componentes de mascota presentes en la página
    return this.petItems.count();
  }

  // Declara un método asíncrono para hacer clic en el botón Add New Pet
  async clickAddNewPet() {
    // Hace clic en el botón Add New Pet
    await this.addNewPetButton.click();
  }
}
