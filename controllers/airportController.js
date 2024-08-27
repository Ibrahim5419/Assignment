const { getRepository } = require("typeorm");

module.exports.getAirportByIataCode = async (req, res, next) => {
  const { iata_code } = req.query;

  // Validate IATA code
  if (!iata_code || typeof iata_code !== "string" || iata_code.length !== 3) {
    return next({ statusCode: 400, message: "Invalid IATA code" });
  }

  try {
    const airportRepository = getRepository("airport");
    const airport = await airportRepository.findOne({
      where: { iata_code },
      relations: ["city", "city.country"],
    });

    if (!airport) {
      return next({ statusCode: 404, message: "Airport not found" });
    }

    const response = {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: {
            id: airport.city.id,
            name: airport.city.name,
            country_id: airport.city.country?.id || null,
            is_active: airport.city.is_active,
            lat: airport.city.lat,
            long: parseFloat(airport.city.long),
          },
          country: airport.city.country
            ? {
                id: airport.city.country.id,
                name: airport.city.country.name,
                country_code_two: airport.city.country.country_code_two,
                country_code_three: airport.city.country.country_code_three,
                mobile_code: airport.city.country.mobile_code,
                continent_id: airport.city.country.continent_id,
              }
            : null,
        },
      },
    };

    res.json(response);
  } catch (error) {
    // Pass error to the next middleware (error handler)
    next(error);
  }
};
