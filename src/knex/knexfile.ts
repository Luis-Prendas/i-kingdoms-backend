import type { Knex } from "knex";
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, './dev.sqlite3')
    },
    useNullAsDefault: true,
    debug: true,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, './prod.sqlite3')
    },
    useNullAsDefault: true,
  }
};

export default config;
