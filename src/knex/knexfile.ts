import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/knex/dev.sqlite3"
    },
    useNullAsDefault: true,
    debug: true,
    migrations: {
      directory: '/',
      tableName: 'migrations'
    }
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./src/knex/prod.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: '/',
      tableName: 'migrations'
    }
  }
};

export default config;
