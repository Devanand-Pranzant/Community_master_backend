import * as model from "../models/userProjectRoleModel.js";

export async function assignUserToProject(data) {
  await model.assignUserToProject(data);
}

export async function getUserAssignments(userId) {
  const result = await model.getUserAssignments(userId);
  return result.rows;
}

export async function removeAssignment(id) {
  await model.removeAssignment(id);
}
