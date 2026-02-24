import * as SideMenuModel from "../models/sidemenuModel.js";

// export async function getAllSideMenusService(projectId) {
//   const result = await SideMenuModel.getAllSideMenus(projectId);
//   return result.rows;
// }

// export async function getProjectSideMenuService(userId, projectId) {
//   const result = await SideMenuModel.getSideMenuByUserAndProject(
//     userId,
//     projectId,
//   );

//   return result.rows;
// }

// export async function hasRouteAccess(userId, projectId, pageUrl) {
//   const result = await SideMenuModel.checkRouteAccess(
//     userId,
//     projectId,
//     pageUrl,
//   );

//   return result.rowCount > 0;
// }

export async function getAllSideMenusServiceWithAccess(userId) {
  const result = await SideMenuModel.getAllSideMenusWithAccess(userId);
  return result.rows;
}
