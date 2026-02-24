import * as model from "../models/projectModel.js";

export async function createProject(data) {
  const result = await model.createProject(data);
  return result.rows[0];
}

export async function getProjects() {
  const result = await model.getProjects();
  return result.rows;
}
