import type { APIRoute } from "astro";

import { db } from "../../../prisma/db";

// Forzar que este endpoint sea dinámico (server-rendered) para poder procesar peticiones POST en runtime
export const prerender = false;

// Deshabilitar rechazo de certificados TLS autofirmados a nivel de proceso de NodeJS/Bun
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    if (!email || !email.trim() || !emailRegex.test(email)) {
      return Response.json(
        { error: "Dirección de correo electrónico inválida o no provista." },
        { status: 400 }
      );
    }

    // Check if email already exists in the waitlist
    const existingEntry = await db.orm.Waitlist.where({
      email: email.trim(),
    }).first();

    if (existingEntry) {
      return Response.json(
        {
          error:
            "Esta dirección de correo electrónico ya está inscrita en la lista de espera.",
        },
        { status: 400 }
      );
    }

    // Create in remote PostgreSQL DB using Prisma Next client
    const waitlistEntry = await db.orm.Waitlist.create({
      email: email.trim(),
      status: "pending",
    });

    return Response.json(waitlistEntry, { status: 201 });
  } catch (error) {
    console.error("Waitlist API Error:", error);
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return Response.json({ error: message }, { status: 500 });
  }
};
