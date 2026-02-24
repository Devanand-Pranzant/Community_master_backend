import { pool } from "../config/db.js";

export function createProject({ category_id, project_name }) {
  return pool.query(
    `INSERT INTO projects(category_id, project_name)
     VALUES($1,$2)
     RETURNING *`,
    [category_id, project_name],
  );
}

export function getProjects() {
  return pool.query(`
    SELECT p.*, c.category_name
    FROM projects p
    LEFT JOIN categories c
    ON p.category_id = c.category_id
    WHERE p.is_active = true
    ORDER BY project_name
  `);
}
