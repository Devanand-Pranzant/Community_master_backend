import { pool } from "../config/db.js";

export const getProperties = async (clientId, communityId) => {
  const result = await pool.query(
    "SELECT public.fn_get_properties($1,$2) AS result",
    [clientId, communityId]
  );
  return result.rows[0].result;
};

export const createProperty = async (data) => {
  const result = await pool.query(
    "SELECT public.fn_insert_property($1) AS result",
    [data]
  );
  return result.rows[0].result;
};

export const updateProperty = async (propertyId, data) => {
  const result = await pool.query(
    "SELECT public.fn_update_property($1,$2) AS result",
    [propertyId, data]
  );
  return result.rows[0].result;
};

export const deleteProperty = async (propertyId) => {
  const result = await pool.query(
    "SELECT public.fn_delete_property($1) AS result",
    [propertyId]
  );
  return result.rows[0].result;
};