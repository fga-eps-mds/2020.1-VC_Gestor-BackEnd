module.exports = {
  dbOptions: {
    database: "dev_database",
    username: "developer",
    password: "developer",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    logging: false
  },
  options: {
    type: "js",
    dir: "src/models"
 }
}