// typeorm.config.js
module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Ibrahim786@",
  database: "airport_db",
  synchronize: true,
  logging: false,
  entities: [
    require("../entities/airport"), // adjust based on the actual file location
    require("../entities/city"),
    require("../entities/country"),
  ],
};
