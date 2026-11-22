// Importa z desde la librería zod para definir esquemas de validación
import { z } from "zod";

// Declara y exporta el esquema ownerSchema para validar un objeto owner
export const ownerSchema = z.object({
  // Define la propiedad id como número
  id: z.number(),
  // Define la propiedad firstName como string
  firstName: z.string(),
  // Define la propiedad lastName como string
  lastName: z.string(),
  // Define la propiedad address como string
  address: z.string(),
  // Define la propiedad city como string
  city: z.string(),
  // Define la propiedad telephone como string
  telephone: z.string(),
});

// Declara y exporta el esquema ownersListSchema como un arreglo de ownerSchema
export const ownersListSchema = z.array(ownerSchema);
