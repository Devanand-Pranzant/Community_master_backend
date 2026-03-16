const db = require("../config/db");

// =============================
// GET ALL COUNTRIES
// =============================
exports.getCountries = async () => {

const result = await db.query(`
SELECT
country_id,
country_name
FROM countries
WHERE is_active = true
ORDER BY country_name
`);

return result.rows;

};



// =============================
// GET CITIES BY COUNTRY
// =============================
exports.getCitiesByCountry = async (countryId) => {

const result = await db.query(`
SELECT
city_id,
city_name
FROM cities
WHERE country_id = $1
AND is_active = true
ORDER BY city_name
`, [countryId]);

return result.rows;

};