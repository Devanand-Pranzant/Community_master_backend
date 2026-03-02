const db = require("../config/db");

// exports.create = async (data) => {
//   const result = await db.query(
//     "SELECT public.fn_insert_properties($1) AS result",
//     [data]
//   );
//   return result.rows[0].result;
// };
exports.create = async (data) => {
  const result = await db.query(
    "SELECT public.fn_insert_properties($1) AS result",
    [data]
  );
};

exports.update = async (id, data) => {
  const result = await db.query(
    "SELECT public.fn_update_properties($1,$2) AS result",
    [id, data]
  );
  return result.rows[0].result;
};

// exports.delete = async (id, updated_by) => {
//   const result = await db.query(
//     "SELECT public.fn_delete_properties($1,$2) AS result",
//     [id, updated_by]
//   );
//   return result.rows[0].result;
// };


exports.delete = async (id) => {
  const result = await db.query(
    "SELECT public.fn_delete_properties($1) AS result",
    [id]
  );
  return result.rows[0].result;
};

exports.getAll = async (search = "") => {
  const result = await db.query(
    "SELECT * FROM public.fn_get_properties($1)",
    [search]
  );
  return result.rows;
};


exports.getById = async (id) => {
  const result = await db.query(
    "SELECT * FROM properties WHERE property_id = $1",
    [id]
  );
  return result.rows[0];
};