// airport.js
const { EntitySchema } = require("typeorm");

const airport = new EntitySchema({
  name: "Airport",
  tableName: "airport",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    icao_code: {
      type: "varchar",
      unique: true,
    },
    iata_code: {
      type: "varchar",
      unique: true,
    },
    name: {
      type: "varchar",
    },
    type: {
      type: "varchar",
    },
    latitude_deg: {
      type: "float",
    },
    longitude_deg: {
      type: "float",
    },
    elevation_ft: {
      type: "int",
    },
  },
  relations: {
    city: {
      type: "many-to-one",
      target: "City",
      joinColumn: {
        name: "city_id",
      },
    },
  },
});

module.exports = airport;
