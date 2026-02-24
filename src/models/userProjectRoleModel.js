import { pool } from "../config/db.js";

export function assignUserToProject(data) {
  return pool.query(
    `
    INSERT INTO user_project_roles(user_id, project_id, project_role_id)
    VALUES ($1,$2,$3)
    ON CONFLICT (user_id, project_id)
    DO UPDATE SET project_role_id = EXCLUDED.project_role_id
    `,
    [data.user_id, data.project_id, data.project_role_id],
  );
}

export function getUserAssignments(userId) {
  return pool.query(
    `
    SELECT upr.id,
           p.project_name,
           pr.role_name
    FROM user_project_roles upr
    JOIN projects p ON upr.project_id = p.project_id
    JOIN project_roles pr ON upr.project_role_id = pr.project_role_id
    WHERE upr.user_id = $1
    `,
    [userId],
  );
}

export function removeAssignment(id) {
  return pool.query(
    `
    DELETE FROM user_project_roles
    WHERE id=$1
    `,
    [id],
  );
}
