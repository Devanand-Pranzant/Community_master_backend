// const db = require("../config/db");

// exports.create = async (data) => {
//   const result = await db.query(
//     "SELECT public.fn_insert_properties($1) AS result",
//     [data]
//   );
//   return result.rows[0].result;
// };

// exports.update = async (id, data) => {
//   const result = await db.query(
//     "SELECT public.fn_update_properties($1,$2) AS result",
//     [id, data]
//   );
//   return result.rows[0].result;
// };


// exports.delete = async (id) => {
//   const result = await db.query(
//     "SELECT public.fn_delete_properties($1) AS result",
//     [id]
//   );
//   return result.rows[0].result;
// };

// exports.getAll = async (search = "") => {
//   const result = await db.query(
//     "SELECT * FROM public.fn_get_properties($1)",
//     [search]
//   );
//   return result.rows;
// };


// exports.getById = async (id) => {
//   const result = await db.query(
//     "SELECT * FROM properties WHERE property_id = $1",
//     [id]
//   );
//   return result.rows[0];
// };




//updated code
const db = require("../config/db");

exports.create = async (data) => {
  const result = await db.query(
    "SELECT public.fn_insert_properties($1::jsonb) AS result",
    [JSON.stringify(data)]
  );

  return result.rows[0].result;
};

// exports.update = async (id, data) => {
//   const result = await db.query(
//     "SELECT public.fn_update_properties($1,$2::jsonb) AS result",
//     [id, JSON.stringify(data)]
//   );

//   return result.rows[0].result;
// };

// exports.update = async (id, data) => {
//   const result = await db.query(
//     "SELECT public.fn_update_properties($1, $2::jsonb) AS result",
//     [id, JSON.stringify(data)]
//   );
//   return result.rows[0].result;
// };

exports.update = async (id, data) => {
  try {
    console.log("Model update - ID:", id);
    console.log("Model update - Data:", JSON.stringify(data, null, 2));
    
    const result = await db.query(
      "SELECT public.fn_update_properties($1, $2::jsonb) AS result",
      [id, JSON.stringify(data)]
    );
    
    console.log("Model update - Result:", result.rows[0].result);
    return result.rows[0].result;
  } catch (error) {
    console.error("Model update error:", error);
    throw error;
  }
};
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


exports.getByCommunity = async (communityId) => {
  const result = await db.query(
    `
    SELECT property_id, property_name, total_floors
    FROM properties
    WHERE community_id = $1
      AND is_active = true
    ORDER BY property_name
    `,
    [communityId]
  );

  return result.rows;
};