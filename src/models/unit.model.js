// const db = require("../config/db");

// // exports.create = async (data) => {
// //   const result = await db.query(
// //     "SELECT public.fn_insert_units($1) AS result",
// //     [data]
// //   );
// //   return result.rows[0].result;
// // };


// exports.create = async (data) => {
//   const result = await db.query(
//     "SELECT public.fn_insert_units($1::jsonb) AS result",
//     [JSON.stringify(data)]
//   );
//   return result.rows[0].result;
// };

// exports.update = async (id, data) => {
//   const result = await db.query(
//     "SELECT public.fn_update_units($1,$2) AS result",
//     [id, data]
//   );
//   return result.rows[0].result;
// };

// // exports.delete = async (id, updated_by) => {
// //   const result = await db.query(
// //     "SELECT public.fn_delete_units($1,$2) AS result",
// //     [id, updated_by]
// //   );
// //   return result.rows[0].result;


// // };
// exports.delete = async (id) => {
//   const result = await db.query(
//     "SELECT public.fn_delete_units($1) AS result",
//     [id]
//   );
//   return result.rows[0].result;
// };

// exports.getAll = async (search = "") => {
//   const result = await db.query(
//     `SELECT * FROM units
//      WHERE is_active = true
//      AND unit_number ILIKE $1
//      ORDER BY unit_id DESC`,
//     [`%${search}%`]
//   );
//   return result.rows;
// };

// exports.getById = async (id) => {
//   const result = await db.query(
//     "SELECT * FROM units WHERE unit_id = $1",
//     [id]
//   );
//   return result.rows[0];
// };


const db = require("../config/db");

// exports.create = async (data) => {
//   const result = await db.query(
//     "SELECT public.fn_insert_units($1) AS result",
//     [data]
//   );
//   return result.rows[0].result;
// };


exports.create = async (data) => {
  const result = await db.query(
    "SELECT public.fn_insert_units($1::jsonb) AS result",
    [JSON.stringify(data)]
  );
  return result.rows[0].result;
};

exports.update = async (id, data) => {
  const result = await db.query(
    "SELECT public.fn_update_units($1,$2) AS result",
    [id, data]
  );
  return result.rows[0].result;
};

// exports.delete = async (id, updated_by) => {
//   const result = await db.query(
//     "SELECT public.fn_delete_units($1,$2) AS result",
//     [id, updated_by]
//   );
//   return result.rows[0].result;


// };
exports.delete = async (id) => {
  const result = await db.query(
    "SELECT public.fn_delete_units($1) AS result",
    [id]
  );
  return result.rows[0].result;
};

// exports.getAll = async (search = "") => {
//   const result = await db.query(
//     `SELECT * FROM units
//      WHERE is_active = true
//      AND unit_number ILIKE $1
//      ORDER BY unit_id DESC`,
//     [`%${search}%`]
//   );
//   return result.rows;
// };
exports.getAll = async (search = "") => {
  const result = await db.query(`
    SELECT 
      u.*,
      c.community_name,
      p.property_name
    FROM units u
    JOIN communities c 
      ON u.community_id = c.community_id
    JOIN properties p 
      ON u.property_id = p.property_id
    WHERE u.is_active = true
    ORDER BY u.unit_id DESC
  `);

  return result.rows;
};


// exports.getById = async (id) => {
//   const result = await db.query(
//     "SELECT * FROM units WHERE unit_id = $1",
//     [id]
//   );
//   return result.rows[0];
// };


exports.getById = async (id) => {
  const result = await db.query(
    `
    SELECT 
      u.*,
      c.community_name,
      p.property_name
    FROM units u
    JOIN communities c 
      ON u.community_id = c.community_id
    JOIN properties p 
      ON u.property_id = p.property_id
    WHERE u.unit_id = $1
      AND u.is_active = true
    `,
    [id]
  );

  if (!result.rows.length) return null;

  const unit = result.rows[0];

  return {
    ...unit,
    unit_id: Number(unit.unit_id),
    community_id: Number(unit.community_id),
    property_id: Number(unit.property_id),
    created_by: unit.created_by ? Number(unit.created_by) : null,
  };
};

