import { pool } from "../config/db.js";

export function createCategory({ category_name }) {
  return pool.query(
    `INSERT INTO categories(category_name)
     VALUES($1)
     RETURNING *`,
    [category_name],
  );
}

export function getCategories() {
  return pool.query(
    `SELECT * FROM categories
     WHERE is_active = true
     ORDER BY category_name`,
  );
}
