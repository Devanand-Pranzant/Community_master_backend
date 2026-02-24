import * as model from "../models/adminCategoryModel.js";

export async function createCategory(data) {
  const result = await model.createCategory(data);
  return result.rows[0];
}

export async function getCategories() {
  const result = await model.getCategories();
  return result.rows;
}
