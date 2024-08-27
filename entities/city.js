// city.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "City",
  tableName: "city",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    is_active: {
      type: "boolean",
    },
    lat: {
      type: "float",
    },
    long: {
      type: "float",
    },
  },
  relations: {
    country: {
      type: "many-to-one",
      target: "Country",
      joinColumn: {
        name: "country_id",
      },
    },
  },
});
