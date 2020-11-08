// Update with your config settings.

export default {

  development: {
    client: "sqlite3",
    connection: {
      filename: "./database.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
};
