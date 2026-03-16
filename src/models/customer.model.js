// // // const db = require("../config/db");



// // // //UPDATED
// // // exports.create = async (data) => {

// // // const result = await db.query(
// // // `INSERT INTO customers
// // // (full_name, gender, email, contact_number, country, city,
// // // address_line1, address_line2, profile_picture,
// // // community_id, property_id, unit_id, joining_date, created_by)
// // // VALUES
// // // ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
// // // RETURNING *`,
// // // [
// // // data.full_name,
// // // data.gender,
// // // data.email,
// // // data.contact_number,
// // // data.country,
// // // data.city,
// // // data.address_line1,
// // // data.address_line2,
// // // data.profile_picture,
// // // data.community_id,
// // // data.property_id,
// // // data.unit_id,
// // // data.joining_date,
// // // data.created_by
// // // ]
// // // );

// // // return result.rows[0];

// // // };


// // // // GET ALL CUSTOMERS ....
// // // exports.getAll = async ({ search = "" } = {}) => {

// // //   let query = `
// // //   SELECT 
// // //   c.customer_id,
// // //   c.full_name,
// // //   c.gender,
// // //   c.email,
// // //   c.contact_number,
// // //   c.country,
// // //   c.city,
// // //   c.address_line1,
// // //   c.address_line2,
// // //   c.profile_picture,
// // //   c.joining_date,
// // //   c.is_active,
  
// // //   com.community_name,
// // //   p.property_name,
// // //   u.unit_number
  
// // //   FROM customers c
  
// // //   LEFT JOIN communities com
// // //   ON com.community_id = c.community_id
  
// // //   LEFT JOIN properties p
// // //   ON p.property_id = c.property_id
  
// // //   LEFT JOIN units u
// // //   ON u.unit_id = c.unit_id
  
// // //   WHERE c.is_active = true
// // //   `;
  
// // //   const params = [];
  
// // //   if (search) {
// // //   query += ` AND (
// // //   c.full_name ILIKE $1
// // //   OR c.email ILIKE $1
// // //   OR c.contact_number ILIKE $1
// // //   )`;
// // //   params.push(`%${search}%`);
// // //   }
  
// // //   query += ` ORDER BY c.customer_id DESC`;
  
// // //   const result = await db.query(query, params);
  
// // //   return result.rows;
// // //   };

// // // // GET CUSTOMER BY ID
// // // exports.getById = async (id) => {

// // // const result = await db.query(
// // // `SELECT 
// // // c.*,
// // // com.community_name,
// // // p.property_name,
// // // u.unit_number

// // // FROM customers c

// // // LEFT JOIN communities com
// // // ON com.community_id = c.community_id

// // // LEFT JOIN properties p
// // // ON p.property_id = c.property_id

// // // LEFT JOIN units u
// // // ON u.unit_id = c.unit_id

// // // WHERE c.customer_id = $1`,
// // // [id]
// // // );

// // // return result.rows[0];

// // // };


// // // // UPDATE CUSTOMER
// // // exports.update = async (id,data)=>{

// // // const result = await db.query(
// // // `UPDATE customers SET
// // // full_name=$1,
// // // gender=$2,
// // // email=$3,
// // // contact_number=$4,
// // // country=$5,
// // // city=$6,
// // // address_line1=$7,
// // // address_line2=$8,
// // // profile_picture=$9,
// // // community_id=$10,
// // // property_id=$11,
// // // unit_id=$12,
// // // joining_date=$13,
// // // updated_by=$14,
// // // updated_at=CURRENT_TIMESTAMP
// // // WHERE customer_id=$15
// // // RETURNING *`,
// // // [
// // // data.full_name,
// // // data.gender,
// // // data.email,
// // // data.contact_number,
// // // data.country,
// // // data.city,
// // // data.address_line1,
// // // data.address_line2,
// // // data.profile_picture,
// // // data.community_id,
// // // data.property_id,
// // // data.unit_id,
// // // data.joining_date,
// // // data.updated_by,
// // // id
// // // ]
// // // );

// // // return result.rows[0];

// // // };


// // // // SOFT DELETE CUSTOMER
// // // exports.delete = async (id,updated_by)=>{

// // // await db.query(
// // // `UPDATE customers
// // // SET is_active=false,
// // // updated_by=$1,
// // // updated_at=CURRENT_TIMESTAMP
// // // WHERE customer_id=$2`,
// // // [updated_by,id]
// // // );

// // // return {success:true};

// // // };




// // //====================================================================


// // //fuctions calls
// // const db = require("../config/db");


// // // ============================
// // // CREATE CUSTOMER
// // // ============================
// // // exports.create = async (customer, unit_id, documents) => {

// // // const result = await db.query(
// // // `SELECT fn_insert_customer($1::jsonb,$2,$3::jsonb) AS result`,
// // // [
// // // JSON.stringify(customer),
// // // unit_id,
// // // JSON.stringify(documents)
// // // ]
// // // );

// // // return result.rows[0].result;

// // // };

// // // exports.create = async (customer, unit_id, documents) => {

// // // const result = await db.query(
// // // `SELECT fn_insert_customer($1::jsonb,$2,$3::jsonb) AS result`,
// // // [
// // // JSON.stringify(customer),
// // // unit_id,
// // // JSON.stringify(documents)
// // // ]
// // // );

// // // return result.rows[0].result;

// // // };

// // exports.create = async (customer, allocations) => {

// // const result = await db.query(
// // `SELECT fn_create_customer($1::jsonb,$2::jsonb) AS result`,
// // [
// // JSON.stringify(customer),
// // JSON.stringify(allocations)
// // ]
// // );

// // return result.rows[0].result;

// // };
// // // ============================
// // // GET ALL CUSTOMERS
// // // ============================
// // exports.getAll = async ({ search = "" } = {}) => {

// // const result = await db.query(
// // `SELECT public.fn_get_customers($1) AS result`,
// // [search]
// // );

// // return result.rows[0].result;

// // };



// // // ============================
// // // GET CUSTOMER BY ID
// // // ============================
// // exports.getById = async (id) => {

// // const result = await db.query(
// // `SELECT public.fn_get_customer_by_id($1) AS result`,
// // [id]
// // );

// // return result.rows[0].result;

// // };



// // // ============================
// // // UPDATE CUSTOMER
// // // ============================
// // exports.update = async (id,data)=>{

// // const result = await db.query(
// // `SELECT public.fn_update_customer($1,$2::jsonb) AS result`,
// // [id,JSON.stringify(data)]
// // );

// // return result.rows[0].result;

// // };



// // // ============================
// // // DELETE CUSTOMER
// // // ============================
// // exports.delete = async (id)=>{

// // const result = await db.query(
// // `SELECT public.fn_delete_customer($1) AS result`,
// // [id]
// // );

// // return result.rows[0].result;

// // };

// const db = require("../config/db");


// // ==========================================
// // CREATE CUSTOMER
// // ==========================================
// exports.createCustomer = async (body,files,profile_picture)=>{

// const result = await db.query(
// `
// INSERT INTO customers
// (
// full_name,
// gender,
// email,
// contact_number,
// address_line1,
// address_line2,
// profile_picture,
// joining_date,
// country_id,
// city_id
// )
// VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
// RETURNING *
// `,
// [
// body.full_name,
// body.gender,
// body.email,
// body.contact_number,
// body.address_line1,
// body.address_line2,
// profile_picture,
// body.joining_date,
// body.country || null,
// body.city || null
// ]
// );

// const customer = result.rows[0];
// const customer_id = customer.customer_id;


// // ==============================
// // PARSE ALLOCATIONS
// // ==============================

// const allocations = [];

// Object.keys(body).forEach(key=>{

// if(key.startsWith("community_id_")){

// const index = key.split("_")[2];

// allocations.push({
// index,
// community_id: body[`community_id_${index}`],
// property_id: body[`property_id_${index}`],
// unit_id: body[`unit_id_${index}`]
// });

// }

// });


// // ==============================
// // UNIT MAPPING
// // ==============================

// for(const alloc of allocations){

// if(!alloc.unit_id) continue;

// await db.query(
// `
// INSERT INTO customer_units_mapping
// (customer_id,unit_id)
// VALUES ($1,$2)
// `,
// [customer_id,alloc.unit_id]
// );

// }


// // ==============================
// // DOCUMENTS
// // ==============================

// for(const file of files){

// if(file.fieldname.startsWith("document_")){

// const parts = file.fieldname.split("_");

// const allocIndex = parts[1];
// const docIndex = parts[2];

// const description = body[`description_${allocIndex}_${docIndex}`] || null;

// const allocation = allocations.find(a=>a.index == allocIndex);

// const unit_id = allocation?.unit_id || null;

// await db.query(
// `
// INSERT INTO documents
// (
// customer_id,
// description,
// document_url,
// unit_id
// )
// VALUES ($1,$2,$3,$4)
// `,
// [
// customer_id,
// description,
// "/uploads/" + file.filename,
// unit_id
// ]
// );

// }

// }

// return customer;

// };



// // ==========================================
// // GET ALL CUSTOMERS
// // ==========================================
// exports.getAllCustomers = async (search="")=>{

// const result = await db.query(
// `
// SELECT
// c.*,
// ct.city_name,
// co.country_name,

// ARRAY(
// SELECT u.unit_number
// FROM customer_units_mapping cu
// JOIN units u ON u.unit_id = cu.unit_id
// WHERE cu.customer_id = c.customer_id
// ) AS units

// FROM customers c

// LEFT JOIN cities ct
// ON ct.city_id = c.city_id

// LEFT JOIN countries co
// ON co.country_id = c.country_id

// WHERE c.is_active=true
// AND (
// c.full_name ILIKE $1
// OR c.email ILIKE $1
// OR c.contact_number ILIKE $1
// )

// ORDER BY c.customer_id DESC
// `,
// [`%${search}%`]
// );

// return result.rows.map(row=>({

// customer:{
// customer_id:row.customer_id,
// full_name:row.full_name,
// gender:row.gender,
// email:row.email,
// contact_number:row.contact_number,
// country:row.country_name,
// city:row.city_name,
// address_line1:row.address_line1,
// address_line2:row.address_line2,
// joining_date:row.joining_date,
// profile_picture:row.profile_picture,
// is_active:row.is_active
// },

// units:row.units || []

// }));

// };



// // ==========================================
// // GET CUSTOMER BY ID
// // ==========================================
// exports.getCustomerById = async (id)=>{

// const customer = await db.query(
// `
// SELECT
// c.*,
// ct.city_name,
// co.country_name
// FROM customers c
// LEFT JOIN cities ct ON ct.city_id=c.city_id
// LEFT JOIN countries co ON co.country_id=c.country_id
// WHERE c.customer_id=$1
// `,
// [id]
// );

// const units = await db.query(
// `
// SELECT u.unit_number
// FROM customer_units_mapping cu
// JOIN units u ON u.unit_id=cu.unit_id
// WHERE cu.customer_id=$1
// `,
// [id]
// );

// const documents = await db.query(
// `
// SELECT description,document_url,unit_id
// FROM documents
// WHERE customer_id=$1
// AND is_active=true
// `,
// [id]
// );

// return{
// customer:{
// ...customer.rows[0],
// country:customer.rows[0].country_name,
// city:customer.rows[0].city_name
// },
// units:units.rows.map(r=>r.unit_number),
// documents:documents.rows
// };

// };



// // ==========================================
// // UPDATE CUSTOMER
// // ==========================================
// exports.updateCustomer = async (id,data,profile_picture)=>{

// await db.query(
// `
// UPDATE customers
// SET
// full_name=$1,
// gender=$2,
// email=$3,
// contact_number=$4,
// address_line1=$5,
// address_line2=$6,
// joining_date=$7,
// country_id=$8,
// city_id=$9,
// profile_picture=COALESCE($10,profile_picture),
// updated_at=CURRENT_TIMESTAMP
// WHERE customer_id=$11
// `,
// [
// data.full_name,
// data.gender,
// data.email,
// data.contact_number,
// data.address_line1,
// data.address_line2,
// data.joining_date,
// data.country,
// data.city,
// profile_picture,
// id
// ]
// );

// return { customer_id:id };

// };



// // ==========================================
// // DELETE CUSTOMER
// // ==========================================
// exports.deleteCustomer = async (id)=>{

// await db.query(
// `
// UPDATE customers
// SET is_active=false
// WHERE customer_id=$1
// `,
// [id]
// );

// return { customer_id:id };

// };

const db = require("../config/db");

// ==========================================
// CREATE CUSTOMER
// ==========================================
exports.createCustomer = async (body, files, profile_picture) => {
  const result = await db.query(
    `
    INSERT INTO customers
    (
      full_name,
      gender,
      email,
      contact_number,
      address_line1,
      address_line2,
      profile_picture,
      joining_date,
      country_id,
      city_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [
      body.full_name,
      body.gender,
      body.email,
      body.contact_number,
      body.address_line1,
      body.address_line2,
      profile_picture,
      body.joining_date,
      body.country || null,
      body.city || null,
    ]
  );

  const customer = result.rows[0];
  const customer_id = customer.customer_id;

  // ==============================
  // PARSE ALLOCATIONS
  // ==============================
  const allocations = [];

  Object.keys(body).forEach((key) => {
    if (key.startsWith("community_id_")) {
      const index = key.split("_")[2];

      allocations.push({
        index,
        community_id: body[`community_id_${index}`],
        property_id: body[`property_id_${index}`],
        unit_id: body[`unit_id_${index}`],
      });
    }
  });

  // ==============================
  // UNIT MAPPING
  // ==============================
  for (const alloc of allocations) {
    if (!alloc.unit_id) continue;

    await db.query(
      `
      INSERT INTO customer_units_mapping
      (customer_id, unit_id)
      VALUES ($1, $2)
      `,
      [customer_id, alloc.unit_id]
    );
  }

  // ==============================
  // DOCUMENTS
  // ==============================
  for (const file of files) {
    if (file.fieldname.startsWith("document_")) {
      const parts = file.fieldname.split("_");
      const allocIndex = parts[1];
      const docIndex = parts[2];

      const description = body[`description_${allocIndex}_${docIndex}`] || null;
      const allocation = allocations.find((a) => a.index == allocIndex);
      const unit_id = allocation?.unit_id || null;

      await db.query(
        `
        INSERT INTO documents
        (
          customer_id,
          description,
          document_url,
          unit_id
        )
        VALUES ($1, $2, $3, $4)
        `,
        [customer_id, description, "/uploads/" + file.filename, unit_id]
      );
    }
  }

  return customer;
};

// ==========================================
// GET ALL CUSTOMERS
// ==========================================
// exports.getAllCustomers = async (search = "") => {
//   const result = await db.query(
//     `
//     SELECT 
//       c.*,
//       ct.city_name,
//       co.country_name,
      
//       -- Get units with their building and community details
//       COALESCE(
//         (
//           SELECT json_agg(
//             json_build_object(
//               'unit_number', u.unit_number,
//               'building_name', b.building_name,
//               'community_name', com.community_name,
//               'building_id', b.building_id,
//               'community_id', com.community_id,
//               'unit_id', u.unit_id
//             )
//           )
//           FROM customer_units_mapping cu
//           JOIN units u ON u.unit_id = cu.unit_id
//           LEFT JOIN buildings b ON b.building_id = u.building_id
//           LEFT JOIN communities com ON com.community_id = b.community_id
//           WHERE cu.customer_id = c.customer_id
//         ),
//         '[]'::json
//       ) AS unit_details

//     FROM customers c

//     LEFT JOIN cities ct ON ct.city_id = c.city_id
//     LEFT JOIN countries co ON co.country_id = c.country_id

//     WHERE c.is_active = true
//     AND (
//       $1 = '' 
//       OR c.full_name ILIKE '%' || $1 || '%'
//       OR c.email ILIKE '%' || $1 || '%'
//       OR c.contact_number ILIKE '%' || $1 || '%'
//     )

//     ORDER BY c.customer_id DESC
//     `,
//     [search]
//   );

//   return result.rows.map((row) => ({
//     customer: {
//       customer_id: row.customer_id,
//       full_name: row.full_name,
//       gender: row.gender,
//       email: row.email,
//       contact_number: row.contact_number,
//       country: row.country_name,
//       city: row.city_name,
//       address_line1: row.address_line1,
//       address_line2: row.address_line2,
//       joining_date: row.joining_date,
//       profile_picture: row.profile_picture,
//       is_active: row.is_active,
//     },
//     units: row.unit_details || [], // Now returns array of objects with full details
//   }));
// };
// ==========================================
// GET ALL CUSTOMERS
// ==========================================
exports.getAllCustomers = async (search = "") => {
  const result = await db.query(
    `
    SELECT 
      c.*,
      ct.city_name,
      co.country_name,
      
      -- Get units with their building and community details
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'unit_number', u.unit_number,
              'building_name', b.building_name,
              'community_name', com.community_name,
              'building_id', b.building_id,
              'community_id', com.community_id,
              'unit_id', u.unit_id
            )
          )
          FROM customer_units_mapping cu
          JOIN units u ON u.unit_id = cu.unit_id
          LEFT JOIN buildings b ON b.building_id = u.building_id
          LEFT JOIN communities com ON com.community_id = b.community_id
          WHERE cu.customer_id = c.customer_id
        ),
        '[]'::json
      ) AS unit_details

    FROM customers c

    LEFT JOIN cities ct ON ct.city_id = c.city_id
    LEFT JOIN countries co ON co.country_id = c.country_id

    WHERE c.is_active = true
    AND (
      $1 = '' 
      OR c.full_name ILIKE '%' || $1 || '%'
      OR c.email ILIKE '%' || $1 || '%'
      OR c.contact_number ILIKE '%' || $1 || '%'
    )

    ORDER BY c.customer_id DESC
    `,
    [search]
  );

  return result.rows.map((row) => ({
    customer: {
      customer_id: row.customer_id,
      full_name: row.full_name,
      gender: row.gender,
      email: row.email,
      contact_number: row.contact_number,
      country: row.country_name,
      city: row.city_name,
      address_line1: row.address_line1,
      address_line2: row.address_line2,
      joining_date: row.joining_date,
      profile_picture: row.profile_picture, // Keep as relative path from DB
      is_active: row.is_active,
    },
    units: row.unit_details || [],
  }));
};


// ==========================================
// GET CUSTOMER BY ID
// ==========================================
// exports.getCustomerById = async (id) => {
//   const customer = await db.query(
//     `
//     SELECT
//       c.*,
//       ct.city_name,
//       co.country_name
//     FROM customers c
//     LEFT JOIN cities ct ON ct.city_id = c.city_id
//     LEFT JOIN countries co ON co.country_id = c.country_id
//     WHERE c.customer_id = $1
//     `,
//     [id]
//   );

//   // Get units with full details (building and community names)
//   const units = await db.query(
//     `
//     SELECT 
//       u.unit_id,
//       u.unit_number,
//       u.floor_number,
//       u.unit_type,
//       u.area_sqft,
//       u.status,
//       u.is_occupied,
//       b.building_id,
//       b.building_name,
//       b.building_code,
//       com.community_id,
//       com.community_name,
//       com.community_code,
//       com.city as community_city,
//       com.country as community_country
//     FROM customer_units_mapping cu
//     JOIN units u ON u.unit_id = cu.unit_id
//     LEFT JOIN buildings b ON b.building_id = u.building_id
//     LEFT JOIN communities com ON com.community_id = b.community_id
//     WHERE cu.customer_id = $1
//     ORDER BY u.unit_number
//     `,
//     [id]
//   );

//   // Get documents with unit information
//   const documents = await db.query(
//     `
//     SELECT 
//       d.document_id,
//       d.description,
//       d.document_url,
//       d.unit_id,
//       d.created_at,
//       u.unit_number
//     FROM documents d
//     LEFT JOIN units u ON u.unit_id = d.unit_id
//     WHERE d.customer_id = $1
//     AND d.is_active = true
//     ORDER BY d.created_at DESC
//     `,
//     [id]
//   );

//   return {
//     customer: {
//       ...customer.rows[0],
//       country: customer.rows[0]?.country_name,
//       city: customer.rows[0]?.city_name,
//     },
//     units: units.rows, // Now returns array of unit objects with building and community details
//     documents: documents.rows,
//   };
// };

// ==========================================
// GET CUSTOMER BY ID
// ==========================================
exports.getCustomerById = async (id) => {
  const customer = await db.query(
    `
    SELECT
      c.*,
      ct.city_name,
      co.country_name
    FROM customers c
    LEFT JOIN cities ct ON ct.city_id = c.city_id
    LEFT JOIN countries co ON co.country_id = c.country_id
    WHERE c.customer_id = $1
    `,
    [id]
  );

  // Get units with full details (building and community names)
  const units = await db.query(
    `
    SELECT 
      u.unit_id,
      u.unit_number,
      u.floor_number,
      u.unit_type,
      u.area_sqft,
      u.status,
      u.is_occupied,
      b.building_id,
      b.building_name,
      b.building_code,
      com.community_id,
      com.community_name,
      com.community_code,
      com.city as community_city,
      com.country as community_country
    FROM customer_units_mapping cu
    JOIN units u ON u.unit_id = cu.unit_id
    LEFT JOIN buildings b ON b.building_id = u.building_id
    LEFT JOIN communities com ON com.community_id = b.community_id
    WHERE cu.customer_id = $1
    ORDER BY u.unit_number
    `,
    [id]
  );

  // Get documents with unit information
  const documents = await db.query(
    `
    SELECT 
      d.document_id,
      d.description,
      d.document_url,
      d.unit_id,
      d.created_at,
      u.unit_number
    FROM documents d
    LEFT JOIN units u ON u.unit_id = d.unit_id
    WHERE d.customer_id = $1
    AND d.is_active = true
    ORDER BY d.created_at DESC
    `,
    [id]
  );

  return {
    customer: {
      ...customer.rows[0],
      country: customer.rows[0]?.country_name,
      city: customer.rows[0]?.city_name,
      profile_picture: customer.rows[0]?.profile_picture, // Keep as relative path
    },
    units: units.rows,
    documents: documents.rows,
  };
};

// ==========================================
// UPDATE CUSTOMER
// ==========================================
// exports.updateCustomer = async (id, data, profile_picture) => {
//   await db.query(
//     `
//     UPDATE customers
//     SET
//       full_name = $1,
//       gender = $2,
//       email = $3,
//       contact_number = $4,
//       address_line1 = $5,
//       address_line2 = $6,
//       joining_date = $7,
//       country_id = $8,
//       city_id = $9,
//       profile_picture = COALESCE($10, profile_picture),
//       updated_at = CURRENT_TIMESTAMP
//     WHERE customer_id = $11
//     `,
//     [
//       data.full_name,
//       data.gender,
//       data.email,
//       data.contact_number,
//       data.address_line1,
//       data.address_line2,
//       data.joining_date,
//       data.country,
//       data.city,
//       profile_picture,
//       id,
//     ]
//   );

//   return { customer_id: id };
// };

// ==========================================
// UPDATE CUSTOMER
// ==========================================
// exports.updateCustomer = async (id, data, profile_picture, files = []) => {
//   const client = await db.connect();
  
//   try {
//     await client.query('BEGIN');

//     // Update customer basic info
//     await client.query(
//       `
//       UPDATE customers
//       SET
//         full_name = $1,
//         gender = $2,
//         email = $3,
//         contact_number = $4,
//         address_line1 = $5,
//         address_line2 = $6,
//         joining_date = $7,
//         country_id = $8,
//         city_id = $9,
//         profile_picture = COALESCE($10, profile_picture),
//         updated_at = CURRENT_TIMESTAMP
//       WHERE customer_id = $11
//       `,
//       [
//         data.full_name,
//         data.gender,
//         data.email,
//         data.contact_number,
//         data.address_line1,
//         data.address_line2,
//         data.joining_date,
//         data.country || null,
//         data.city || null,
//         profile_picture,
//         id,
//       ]
//     );

//     // Parse allocations from form data
//     const allocations = [];
//     Object.keys(data).forEach((key) => {
//       if (key.startsWith("community_id_")) {
//         const index = key.split("_")[2];
//         allocations.push({
//           index,
//           community_id: data[`community_id_${index}`],
//           property_id: data[`property_id_${index}`],
//           unit_id: data[`unit_id_${index}`],
//         });
//       }
//     });

//     // Only update allocations if new ones are provided
//     if (allocations.length > 0) {
//       // Delete existing unit mappings
//       await client.query(
//         `DELETE FROM customer_units_mapping WHERE customer_id = $1`,
//         [id]
//       );

//       // Insert new unit mappings
//       for (const alloc of allocations) {
//         if (!alloc.unit_id) continue;

//         await client.query(
//           `
//           INSERT INTO customer_units_mapping
//           (customer_id, unit_id)
//           VALUES ($1, $2)
//           `,
//           [id, alloc.unit_id]
//         );
//       }
//     }

//     // Handle document updates if any
//     if (files && files.length > 0) {
//       for (const file of files) {
//         if (file.fieldname.startsWith("document_")) {
//           const parts = file.fieldname.split("_");
//           const allocIndex = parts[1];
//           const docIndex = parts[2];

//           const description = data[`description_${allocIndex}_${docIndex}`] || null;
//           const allocation = allocations.find((a) => a.index == allocIndex);
//           const unit_id = allocation?.unit_id || null;

//           await client.query(
//             `
//             INSERT INTO documents
//             (
//               customer_id,
//               description,
//               document_url,
//               unit_id
//             )
//             VALUES ($1, $2, $3, $4)
//             `,
//             [id, description, "/uploads/" + file.filename, unit_id]
//           );
//         }
//       }
//     }

//     await client.query('COMMIT');
//     return { success: true, customer_id: id };

//   } catch (err) {
//     await client.query('ROLLBACK');
//     throw err;
//   } finally {
//     client.release();
//   }
// };

// ==========================================
// UPDATE CUSTOMER
// ==========================================
exports.updateCustomer = async (id, data, profile_picture, files = []) => {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');

    // Update customer basic info
    await client.query(
      `
      UPDATE customers
      SET
        full_name = $1,
        gender = $2,
        email = $3,
        contact_number = $4,
        address_line1 = $5,
        address_line2 = $6,
        joining_date = $7,
        country_id = $8,
        city_id = $9,
        profile_picture = COALESCE($10, profile_picture),
        updated_at = CURRENT_TIMESTAMP
      WHERE customer_id = $11
      `,
      [
        data.full_name,
        data.gender,
        data.email,
        data.contact_number,
        data.address_line1,
        data.address_line2,
        data.joining_date,
        data.country || null,
        data.city || null,
        profile_picture,
        id,
      ]
    );

    // Parse allocations from form data
    const allocations = [];
    Object.keys(data).forEach((key) => {
      if (key.startsWith("community_id_")) {
        const index = key.split("_")[2];
        allocations.push({
          index,
          community_id: data[`community_id_${index}`],
          property_id: data[`property_id_${index}`],
          unit_id: data[`unit_id_${index}`],
        });
      }
    });

    // Only update allocations if new ones are provided
    if (allocations.length > 0) {
      // Delete existing unit mappings
      await client.query(
        `DELETE FROM customer_units_mapping WHERE customer_id = $1`,
        [id]
      );

      // Insert new unit mappings
      for (const alloc of allocations) {
        if (!alloc.unit_id) continue;

        await client.query(
          `
          INSERT INTO customer_units_mapping
          (customer_id, unit_id)
          VALUES ($1, $2)
          `,
          [id, alloc.unit_id]
        );
      }
    }

    // Handle deleted documents if any
    if (data.deleted_documents) {
      const deletedDocs = JSON.parse(data.deleted_documents);
      if (deletedDocs.length > 0) {
        await client.query(
          `UPDATE documents SET is_active = false WHERE document_id = ANY($1::bigint[])`,
          [deletedDocs]
        );
      }
    }

    // Handle new document uploads
    if (files && files.length > 0) {
      // Filter for new document files (they come with fieldname starting with "document_new_")
      const newDocumentFiles = files.filter(file => 
        file.fieldname.startsWith("document_new_")
      );

      for (let i = 0; i < newDocumentFiles.length; i++) {
        const file = newDocumentFiles[i];
        
        // Extract index from fieldname (document_new_0, document_new_1, etc.)
        const index = file.fieldname.split("_")[2];
        
        // Get description and unit_id from data
        const description = data[`description_new_${index}`] || null;
        const unit_id = data[`document_unit_new_${index}`] || null;

        await client.query(
          `
          INSERT INTO documents
          (
            customer_id,
            description,
            document_url,
            unit_id,
            created_by
          )
          VALUES ($1, $2, $3, $4, $5)
          `,
          [id, description, "/uploads/" + file.filename, unit_id, data.updated_by || null]
        );
      }
    }

    await client.query('COMMIT');
    return { success: true, customer_id: id };

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error in updateCustomer:", err);
    throw err;
  } finally {
    client.release();
  }
};

// ==========================================
// DELETE CUSTOMER
// ==========================================
exports.deleteCustomer = async (id) => {
  await db.query(
    `
    UPDATE customers
    SET is_active = false
    WHERE customer_id = $1
    `,
    [id]
  );

  return { customer_id: id };
};