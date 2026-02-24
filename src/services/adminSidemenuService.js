import * as model from "../models/adminSidemenuModel.js";

export async function createAdminSidemenu(data) {
  const result = await model.createAdminSidemenu(data);
  return result.rows[0];
}

export async function getAdminSidemenuByProject(projectId) {
  const result = await model.getAdminSidemenuByProject(projectId);
  return result.rows;
}

export async function updateAdminSidemenu(id, data) {
  const result = await model.updateAdminSidemenu(id, data);
  return result.rows[0];
}

export async function deleteAdminSidemenu(id) {
  await model.deleteAdminSidemenu(id);
}
