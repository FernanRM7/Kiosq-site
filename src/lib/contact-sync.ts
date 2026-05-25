/**
 * Módulo para gestionar contactos de formularios
 */

export interface ContactSubmission {
  createdAt: string;
  email: string;
  message: string;
  name: string;
  phone: string;
  status: "failed" | "pending" | "saved";
}

const STORAGE_KEY = "contactSubmissions";

/**
 * Guardar contacto en localStorage
 */
export function saveContactLocally(
  data: Omit<ContactSubmission, "createdAt" | "status">
): ContactSubmission {
  const submissions: ContactSubmission[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const newSubmission: ContactSubmission = {
    ...data,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  submissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));

  return newSubmission;
}

/**
 * Obtener contactos pendientes
 */
export function getPendingContacts(): ContactSubmission[] {
  const submissions: ContactSubmission[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
  return submissions.filter((s) => s.status === "pending");
}

/**
 * Sincronizar contactos con la base de datos
 */
export function syncContactsToDatabase(): Promise<void> {
  // This would be implemented on the server side
  // eslint-disable-next-line no-console
  console.log("Sincronizando contactos...");
  return Promise.resolve();
}
