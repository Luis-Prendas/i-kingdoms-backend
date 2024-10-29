import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/knex/dev.sqlite3"
    },
    useNullAsDefault: true,
    debug: true
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./src/knex/prod.sqlite3"
    },
    useNullAsDefault: true,
  }
};

export default config;
