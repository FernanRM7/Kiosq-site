import type { APIRoute } from "astro";

import { db } from "../../../prisma/db";

// Forzar que este endpoint sea dinámico (server-rendered) para poder procesar peticiones POST en runtime
export const prerender = false;

// Deshabilitar rechazo de certificados TLS autofirmados a nivel de proceso de NodeJS/Bun
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name || !name.trim() || name.trim().length < 2) {
      return Response.json(
        { error: "Nombre inválido o muy corto." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    if (!email || !email.trim() || !emailRegex.test(email)) {
      return Response.json(
        { error: "Dirección de correo electrónico inválida." },
        { status: 400 }
      );
    }

    if (!message || !message.trim() || message.trim().length < 10) {
      return Response.json(
        { error: "El mensaje debe tener al menos 10 caracteres." },
        { status: 400 }
      );
    }

    // Phone is optional
    const cleanPhone = phone && phone.trim() ? phone.trim() : null;

    // Create in remote PostgreSQL DB using Prisma Next client
    const submission = await db.orm.ContactForm.create({
      email: email.trim(),
      message: message.trim(),
      name: name.trim(),
      phone: cleanPhone,
      status: "pending",
    });

    return Response.json(submission, { status: 201 });
  } catch (error) {
    console.error("Contact API Error:", error);
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return Response.json({ error: message }, { status: 500 });
  }
};
