// src/data/builders/OwnerBuilder.ts
// Declara y exporta una interfaz Owner con los campos del owner
export interface Owner {
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
}

// PetClinic solo acepta letras en el apellido (nada de números ni guion bajo)
// Define una función flecha que genera una cadena de letras aleatorias de cierta longitud
const randomLetters = (length: number) =>
  // Crea un arreglo de la longitud indicada y lo rellena con letras aleatorias
  Array.from(
    { length },
    () =>
      // Convierte un código de carácter aleatorio entre 'a' y 'z' a letra
      String.fromCharCode(97 + Math.floor(Math.random() * 26)),
    // Une los elementos del arreglo en una sola cadena sin separador
  ).join("");

// Define una función flecha que genera un número de teléfono aleatorio
const randomPhone = () =>
  // Convierte a string un número aleatorio entre 1_000_000_000 y 9_999_999_999
  String(Math.floor(1_000_000_000 + Math.random() * 9_000_000_000));

// Declara y exporta la clase OwnerBuilder
export class OwnerBuilder {
  // Define un campo privado owner con valores por defecto para el owner
  private owner: Owner = {
    // Establece el firstName por defecto como 'Test'
    firstName: "Test",
    // Establece el lastName por defecto con letras aleatorias
    lastName: `Owner${randomLetters(10)}`,
    // Establece el address por defecto como '123 Main Street'
    address: "123 Main Street",
    // Establece la city por defecto como 'Madison'
    city: "Madison",
    // Establece el telephone por defecto con un número aleatorio
    telephone: randomPhone(),
  };

  // Declara un método para establecer el firstName y retorna this para encadenar
  withFirstName(name: string): this {
    // Asigna el nombre recibido al firstName del owner
    this.owner.firstName = name;
    // Retorna la instancia actual para permitir encadenamiento
    return this;
  }

  // Declara un método para establecer la city y retorna this para encadenar
  withCity(city: string): this {
    // Asigna la ciudad recibida a la city del owner
    this.owner.city = city;
    // Retorna la instancia actual para permitir encadenamiento
    return this;
  }

  // Declara un método para construir y retornar el objeto Owner
  build(): Owner {
    // Retorna una copia del owner para evitar mutaciones externas
    return { ...this.owner };
  }
}
