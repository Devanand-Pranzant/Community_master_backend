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

// exports.update = async (id, data) => {
//   const result = await db.query(
//     "SELECT public.fn_update_units($1,$2) AS result",
//     [id, data]
//   );
//   return result.rows[0].result;
// };

exports.update = async (id, data) => {
  const result = await db.query(
    "SELECT public.fn_update_units($1,$2::jsonb) AS result",
    [id, JSON.stringify(data)]
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
// exports.getAll = async (search = "") => {
//   const result = await db.query(`
//     SELECT 
//       u.*,
//       c.community_name,
//       p.property_name
//     FROM units u
//     JOIN communities c 
//       ON u.community_id = c.community_id
//     JOIN properties p 
//       ON u.property_id = p.property_id
//     WHERE u.is_active = true
//     ORDER BY u.unit_id DESC
//   `);

//   return result.rows;
// };

exports.getAll = async (search = "") => {
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
    WHERE u.is_active = true
      AND (
        u.unit_number ILIKE $1
        OR p.property_name ILIKE $1
        OR c.community_name ILIKE $1
      )
    ORDER BY u.unit_id DESC
    `,
    [`%${search}%`]
  );

  return result.rows;
};


// exports.getById = async (id) => {
//   const result = await db.query(
//     "SELECT * FROM units WHERE unit_id = $1",
//     [id]
//   );
//   return result.rows[0];
// };


// exports.getById = async (id) => {
//   const result = await db.query(
//     `
//     SELECT 
//       u.*,
//       c.community_name,
//       p.property_name
//     FROM units u
//     JOIN communities c 
//       ON u.community_id = c.community_id
//     JOIN properties p 
//       ON u.property_id = p.property_id
//     WHERE u.unit_id = $1
//       AND u.is_active = true
//     `,
//     [id]
//   );

//   if (!result.rows.length) return null;

//   const unit = result.rows[0];

//   return {
//     ...unit,
//     unit_id: Number(unit.unit_id),
//     community_id: Number(unit.community_id),
//     property_id: Number(unit.property_id),
//     created_by: unit.created_by ? Number(unit.created_by) : null,
//   };
// };


// In your unit.model.js - update the getById function
exports.getById = async (id) => {
  const result = await db.query(
    `
    SELECT 
      u.unit_id,
      u.community_id,
      u.property_id,
      u.unit_number,
      u.customer_name,
      u.floor_number,
      u.unit_type,
      u.area_sqft,
      u.status,
      u.is_occupied,
      u.unit_description,  -- Make sure this is selected
      u.description,       -- Include if this column exists
      u.created_at,
      u.updated_at,
      u.created_by,
      u.updated_by,
      u.is_active,
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
// const db = require("../config/db");

exports.getByProperty = async (propertyId) => {
  const result = await db.query(
    `
    SELECT 
      unit_id,
      unit_number,
      customer_name,
      floor_number,
      unit_type,
      status,
      unit_description
    FROM units
    WHERE property_id = $1
    ORDER BY unit_number
    `,
    [propertyId]
  );

  return result.rows;
};