import { pool } from "../config/db.js";

// export function getSideMenuByUserAndProject(userId, projectId) {
//   return pool.query(
//     `
//     SELECT sm.side_menu_id,
//            sm.menu_name,
//            sm.page_url,
//            sm.menu_order,
//            sm.parent_id
//     FROM user_project_roles upr
//     JOIN role_permissions rp
//         ON upr.project_role_id = rp.project_role_id
//     JOIN sidemenu sm
//         ON sm.side_menu_id = rp.side_menu_id
//     WHERE upr.user_id = $1
//       AND upr.project_id = $2
//       AND sm.is_active = TRUE
//     ORDER BY sm.menu_order;
//     `,
//     [userId, projectId]
//   );
// }

// export function getAllSideMenus(projectId) {
//   return pool.query(
//     `
//     SELECT
//         side_menu_id,
//         menu_name,
//         page_url,
//         parent_id,
//         menu_order
//     FROM sidemenu
//     WHERE project_id = $1
//       AND is_active = TRUE
//     ORDER BY parent_id NULLS FIRST, menu_order;
//     `,
//     [projectId],
//   );
// }

// export function getSideMenuByUserAndProject(userId, projectId) {
//   return pool.query(
//     `
//     WITH RECURSIVE menu_tree AS (

//         -- Step 1: get menus user has access to
//         SELECT
//             sm.side_menu_id,
//             sm.menu_name,
//             sm.page_url,
//             sm.menu_order,
//             sm.parent_id,
//             sm.is_active
//         FROM user_project_roles upr
//         JOIN role_permissions rp
//             ON upr.project_role_id = rp.project_role_id
//         JOIN sidemenu sm
//             ON sm.side_menu_id = rp.side_menu_id
//         WHERE upr.user_id = $1
//           AND upr.project_id = $2
//           AND sm.is_active = TRUE

//         UNION

//         -- Step 2: get all parent menus recursively
//         SELECT
//             parent.side_menu_id,
//             parent.menu_name,
//             parent.page_url,
//             parent.menu_order,
//             parent.parent_id,
//             parent.is_active
//         FROM sidemenu parent
//         INNER JOIN menu_tree child
//             ON child.parent_id = parent.side_menu_id
//         WHERE parent.is_active = TRUE
//     )

//     SELECT DISTINCT
//         side_menu_id,
//         menu_name,
//         page_url,
//         menu_order,
//         parent_id
//     FROM menu_tree
//     ORDER BY parent_id NULLS FIRST, menu_order;
//     `,
//     [userId, projectId],
//   );
// }

// export function checkRouteAccess(userId, projectId, pageUrl) {
//   return pool.query(
//     `
//     SELECT 1
//     FROM user_project_roles upr
//     JOIN role_permissions rp
//         ON upr.project_role_id = rp.project_role_id
//     JOIN sidemenu sm
//         ON sm.side_menu_id = rp.side_menu_id
//     WHERE upr.user_id = $1
//       AND upr.project_id = $2
//       AND sm.page_url = $3
//       AND sm.is_active = TRUE
//     LIMIT 1;
//     `,
//     [userId, projectId, pageUrl],
//   );
// }

// export function getAllSideMenusWithAccess(userId) {
//   return pool.query(
//     `
//     WITH RECURSIVE user_permissions AS (

//         -- Step 1: menus user directly has access to
//         SELECT sm.side_menu_id, sm.parent_id
//         FROM sidemenu sm
//         JOIN role_permissions rp
//             ON sm.side_menu_id = rp.side_menu_id
//         JOIN user_project_roles upr
//             ON upr.project_role_id = rp.project_role_id
//         WHERE upr.user_id = $1

//         UNION

//         -- Step 2: recursively include parents
//         SELECT parent.side_menu_id, parent.parent_id
//         FROM sidemenu parent
//         JOIN user_permissions up
//             ON up.parent_id = parent.side_menu_id
//     )

//     SELECT
//         sm.side_menu_id,
//         sm.menu_name,
//         sm.page_url,
//         sm.parent_id,
//         sm.menu_order,

//         CASE
//           WHEN sm.parent_id IS NULL THEN true
//           WHEN up.side_menu_id IS NOT NULL THEN true
//           ELSE false
//         END AS is_accessible

//     FROM sidemenu sm

//     LEFT JOIN user_permissions up
//         ON sm.side_menu_id = up.side_menu_id

//     WHERE sm.is_active = TRUE

//     ORDER BY sm.parent_id NULLS FIRST, sm.menu_order;
//     `,
//     [userId],
//   );
// }

export function getAllSideMenusWithAccess(userId) {
  return pool.query(`SELECT * FROM get_all_sidemenu_with_access($1);`, [
    userId,
  ]);
}
