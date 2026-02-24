import * as model from "../models/projectRoleModel.js";

export async function createRole(data) {
  const result = await model.createRole(data);
  return result.rows[0];
}

export async function getRoles(projectId) {
  const result = await model.getRoles(projectId);
  return result.rows;
}
