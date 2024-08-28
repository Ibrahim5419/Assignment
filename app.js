const express = require("express");
const { createConnection } = require("typeorm");
const { getAirportByIataCode } = require("./controllers/airportController");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 7000;

require("dotenv").config();

// Connect to the database
createConnection(require("./config/typeorm.config"))
  .then(() => {
    console.log("Database connected");

    // Define routes
    app.get("/airport", getAirportByIataCode);

    // Use the error-handling middleware after all routes and middleware
    app.use(errorHandler);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Database connection error: ", error));
