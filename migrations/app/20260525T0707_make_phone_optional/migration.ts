#!/usr/bin/env -S node
import {
  Migration,
  MigrationCLI,
  addForeignKey,
  addUnique,
  createIndex,
  createTable,
} from "@prisma-next/postgres/migration";

export default class M extends Migration {
  override describe() {
    return {
      from: null,
      to: "sha256:c77620a3a08aaa9b71dc944efeff321c715b3218ce0ee3b66dda355074c3d752",
    };
  }

  override get operations() {
    return [
      createTable(
        "__unbound__",
        "contactForm",
        [
          {
            name: "createdAt",
            typeSql: "timestamptz",
            defaultSql: "DEFAULT (now())",
            nullable: false,
          },
          { name: "email", typeSql: "text", defaultSql: "", nullable: false },
          { name: "id", typeSql: "SERIAL", defaultSql: "", nullable: false },
          { name: "message", typeSql: "text", defaultSql: "", nullable: false },
          { name: "name", typeSql: "text", defaultSql: "", nullable: false },
          { name: "phone", typeSql: "text", defaultSql: "", nullable: true },
          {
            name: "status",
            typeSql: "text",
            defaultSql: "DEFAULT 'pending'",
            nullable: false,
          },
          {
            name: "updatedAt",
            typeSql: "timestamptz",
            defaultSql: "",
            nullable: false,
          },
        ],
        { columns: ["id"] }
      ),
      createTable(
        "__unbound__",
        "post",
        [
          {
            name: "authorId",
            typeSql: "int4",
            defaultSql: "",
            nullable: false,
          },
          { name: "content", typeSql: "text", defaultSql: "", nullable: true },
          {
            name: "createdAt",
            typeSql: "timestamptz",
            defaultSql: "DEFAULT (now())",
            nullable: false,
          },
          { name: "id", typeSql: "SERIAL", defaultSql: "", nullable: false },
          { name: "title", typeSql: "text", defaultSql: "", nullable: false },
          {
            name: "updatedAt",
            typeSql: "timestamptz",
            defaultSql: "",
            nullable: false,
          },
        ],
        { columns: ["id"] }
      ),
      createTable(
        "__unbound__",
        "user",
        [
          {
            name: "createdAt",
            typeSql: "timestamptz",
            defaultSql: "DEFAULT (now())",
            nullable: false,
          },
          { name: "email", typeSql: "text", defaultSql: "", nullable: false },
          { name: "id", typeSql: "SERIAL", defaultSql: "", nullable: false },
          { name: "name", typeSql: "text", defaultSql: "", nullable: true },
          {
            name: "updatedAt",
            typeSql: "timestamptz",
            defaultSql: "",
            nullable: false,
          },
          { name: "username", typeSql: "text", defaultSql: "", nullable: true },
        ],
        { columns: ["id"] }
      ),
      createTable(
        "__unbound__",
        "waitlist",
        [
          {
            name: "createdAt",
            typeSql: "timestamptz",
            defaultSql: "DEFAULT (now())",
            nullable: false,
          },
          { name: "email", typeSql: "text", defaultSql: "", nullable: false },
          { name: "id", typeSql: "SERIAL", defaultSql: "", nullable: false },
          {
            name: "status",
            typeSql: "text",
            defaultSql: "DEFAULT 'pending'",
            nullable: false,
          },
          {
            name: "updatedAt",
            typeSql: "timestamptz",
            defaultSql: "",
            nullable: false,
          },
        ],
        { columns: ["id"] }
      ),
      addUnique("__unbound__", "user", "user_email_key", ["email"]),
      createIndex("__unbound__", "contactForm", "contactForm_email_idx", [
        "email",
      ]),
      createIndex("__unbound__", "contactForm", "contactForm_createdAt_idx", [
        "createdAt",
      ]),
      createIndex("__unbound__", "post", "post_authorId_idx", ["authorId"]),
      createIndex("__unbound__", "waitlist", "waitlist_email_idx", ["email"]),
      createIndex("__unbound__", "waitlist", "waitlist_createdAt_idx", [
        "createdAt",
      ]),
      addForeignKey("__unbound__", "post", {
        name: "post_authorId_fkey",
        columns: ["authorId"],
        references: { schema: "__unbound__", table: "user", columns: ["id"] },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
