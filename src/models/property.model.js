

const db = require("../config/db");



// CREATE
exports.create = async (data) => {

const result = await db.query(
`SELECT public.fn_insert_buildings($1::jsonb) AS result`,
[JSON.stringify(data)]
);

return result.rows[0].result;

};



// GET ALL
exports.getAll = async () => {

const result = await db.query(
`SELECT public.fn_get_all_buildings() AS result`
);

return result.rows[0].result;

};



// GET BY ID
exports.getById = async (id) => {

const result = await db.query(
`SELECT public.fn_get_building_by_id($1) AS result`,
[id]
);

return result.rows[0].result;

};



// GET BY COMMUNITY
exports.getByCommunity = async (communityId) => {

const result = await db.query(
`SELECT public.fn_get_buildings_by_community($1) AS result`,
[communityId]
);

return result.rows[0].result;

};



// UPDATE
exports.update = async (id,data) => {

data.building_id=id;

const result = await db.query(
`SELECT public.fn_update_building($1::jsonb) AS result`,
[JSON.stringify(data)]
);

return result.rows[0].result;

};



// DELETE
exports.delete = async (id,updated_by) => {

const result = await db.query(
`SELECT public.fn_delete_building($1,$2) AS result`,
[id,updated_by]
);

return result.rows[0].result;

};