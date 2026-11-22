import { test, expect } from "@playwright/test";
import { OwnerBuilder } from "@data/builders/OwnerBuilder";

test("OwnerBuilder genera datos únicos en cada build", () => {
  const a = new OwnerBuilder().build();
  const b = new OwnerBuilder().build();
  expect(a.lastName).not.toBe(b.lastName);
});

test("OwnerBuilder permite sobreescribir el nombre", () => {
  const owner = new OwnerBuilder().withFirstName("Abel").build();
  expect(owner.firstName).toBe("Abel");
});

test("OwnerBuilder genera teléfono de 10 dígitos", () => {
  const owner = new OwnerBuilder().build();
  expect(owner.telephone).toMatch(/^\d{10}$/);
});
