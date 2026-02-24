import { pool } from "../config/db.js";

export function createAdminSidemenu(data) {
  return pool.query(
    `
    INSERT INTO sidemenu
    (project_id, parent_id, menu_name, page_url, menu_order)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      data.project_id,
      data.parent_id,
      data.menu_name,
      data.page_url,
      data.menu_order,
    ],
  );
}

export function getAdminSidemenuByProject(projectId) {
  return pool.query(
    `
    SELECT *
    FROM sidemenu
    WHERE project_id = $1
    AND is_active = true
    ORDER BY parent_id NULLS FIRST, menu_order
    `,
    [projectId],
  );
}

export function updateAdminSidemenu(id, data) {
  return pool.query(
    `
    UPDATE sidemenu
    SET menu_name=$1,
        page_url=$2,
        parent_id=$3,
        menu_order=$4
    WHERE side_menu_id=$5
    RETURNING *
    `,
    [data.menu_name, data.page_url, data.parent_id, data.menu_order, id],
  );
}

export function deleteAdminSidemenu(id) {
  return pool.query(
    `
    UPDATE sidemenu
    SET is_active=false
    WHERE side_menu_id=$1
    `,
    [id],
  );
}
