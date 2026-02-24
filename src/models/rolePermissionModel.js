import { pool } from "../config/db.js";

export function assignPermission({ project_role_id, side_menu_id }) {
  return pool.query(
    `INSERT INTO role_permissions(project_role_id,side_menu_id)
     VALUES($1,$2)
     ON CONFLICT DO NOTHING`,
    [project_role_id, side_menu_id],
  );
}

export function getPermissions(roleId) {
  return pool.query(
    `SELECT side_menu_id FROM role_permissions
     WHERE project_role_id=$1`,
    [roleId],
  );
}
