import { pool } from "../config/db.js";

export function createRole({ project_id, role_name }) {
  return pool.query(
    `INSERT INTO project_roles(project_id, role_name)
     VALUES($1,$2)
     RETURNING *`,
    [project_id, role_name],
  );
}

export function getRoles(projectId) {
  return pool.query(
    `SELECT * FROM project_roles
     WHERE project_id=$1`,
    [projectId],
  );
}
