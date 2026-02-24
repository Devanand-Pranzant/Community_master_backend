import { pool } from "../config/db.js";

export const getCommunities = async (clientId) => {
  const result = await pool.query(
    "SELECT public.fn_get_communities($1) AS result",
    [clientId]
  );
  return result.rows[0].result;
};

export const createCommunity = async (data) => {
  const result = await pool.query(
    "SELECT public.fn_insert_community($1) AS result",
    [data]
  );
  return result.rows[0].result;
};

export const updateCommunity = async (communityId, data) => {
  const result = await pool.query(
    "SELECT public.fn_update_community($1,$2) AS result",
    [communityId, data]
  );
  return result.rows[0].result;
};

export const deleteCommunity = async (communityId) => {
  const result = await pool.query(
    "SELECT public.fn_delete_community($1) AS result",
    [communityId]
  );
  return result.rows[0].result;
};