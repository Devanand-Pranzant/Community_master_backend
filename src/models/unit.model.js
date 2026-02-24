import { pool } from "../config/db.js";

export const getUnits = async (clientId, communityId, propertyId) => {
  const result = await pool.query(
    "SELECT public.fn_get_units($1,$2,$3) AS result",
    [clientId, communityId, propertyId]
  );
  return result.rows[0].result;
};

export const createUnit = async (data) => {
  const result = await pool.query(
    "SELECT public.fn_insert_unit($1) AS result",
    [data]
  );
  return result.rows[0].result;
};

export const updateUnit = async (unitId, data) => {
  const result = await pool.query(
    "SELECT public.fn_update_unit($1,$2) AS result",
    [unitId, data]
  );
  return result.rows[0].result;
};

export const deleteUnit = async (unitId) => {
  const result = await pool.query(
    "SELECT public.fn_delete_unit($1) AS result",
    [unitId]
  );
  return result.rows[0].result;
};