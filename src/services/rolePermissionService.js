import * as model from "../models/rolePermissionModel.js";

export async function assignPermission(data) {
  await model.assignPermission(data);
}

export async function getPermissions(roleId) {
  const result = await model.getPermissions(roleId);
  return result.rows;
}
