// Deshabilitar rechazo de certificados TLS autofirmados a nivel de proceso de NodeJS/Bun
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import "dotenv/config";
import postgres from "@prisma-next/postgres/runtime";
import { Pool } from "pg";

import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

// Crear pool personalizado para admitir certificados TLS autofirmados de la base de datos remota
const pool = new Pool({
  connectionString: process.env["DATABASE_URL"]!,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = postgres<Contract>({
  contractJson,
  pg: pool,
});
