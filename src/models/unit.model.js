
const db = require("../config/db");



exports.getAll = async () => {

  const result = await db.query(
    "SELECT public.fn_get_all_units() AS result"
  );

  return result.rows[0].result || [];

};





exports.getById = async (id) => {

  const result = await db.query(
    "SELECT public.fn_get_unit_by_id($1::bigint) AS result",
    [id]
  );

  return result.rows[0].result;

};



// ==========================================
// GET UNITS BY PROPERTY (BUILDING)
// ==========================================
exports.getByProperty = async (propertyId) => {

  const result = await db.query(
    "SELECT public.fn_get_units_by_building_id($1) AS result",
    [propertyId]
  );

  return result.rows[0].result || [];

};





// ==========================================
// CREATE UNIT
// ==========================================
exports.create = async (data) => {

  const result = await db.query(
    "SELECT public.fn_insert_units($1::jsonb) AS result",
    [JSON.stringify(data)]
  );

  return result.rows[0].result;

};





// ==========================================
// UPDATE UNIT
// ==========================================
exports.update = async (id, data) => {

  const result = await db.query(
    "SELECT public.fn_update_units($1,$2::jsonb) AS result",
    [id, JSON.stringify(data)]
  );

  return result.rows[0].result;

};





// ==========================================
// DELETE UNIT
// ==========================================
exports.delete = async (id) => {
  const result = await db.query(
    "SELECT public.fn_delete_units($1::bigint) AS result",
    [id]
  );

  return result.rows[0].result;
};