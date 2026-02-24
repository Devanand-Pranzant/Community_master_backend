import * as SideMenuService from "../services/sidemenuService.js";

// export async function getAllSideMenus(req, res) {
//   try {
//     const { projectId } = req.params;

//     const result = await SideMenuService.getAllSideMenusService(projectId);

//     res.json({
//       success: true,
//       sidemenu: result,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// }

// export async function getProjectSideMenu(req, res) {
//   try {
//     const userId = req.user.sub; // from JWT
//     const { projectId } = req.params;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     const result = await SideMenuService.getProjectSideMenuService(
//       userId,
//       projectId,
//     );

//     res.json({
//       success: true,
//       sidemenu: result,
//     });
//   } catch (err) {
//     console.error("SideMenu API Error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message || "Server error",
//     });
//   }
// }

// export async function checkAccess(req, res) {
//   try {
//     const userId = req.user.sub;
//     const { projectId, pageUrl } = req.body;

//     if (!userId || !projectId || !pageUrl) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required parameters",
//       });
//     }

//     // Check if user has permission
//     // The service returns boolean directly
//     const hasAccess = await SideMenuService.hasRouteAccess(
//       userId,
//       projectId,
//       pageUrl,
//     );

//     res.json({
//       success: true,
//       allowed: hasAccess,
//     });
//   } catch (err) {
//     console.error("CheckAccess API Error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message || "Server error",
//     });
//   }
// }

export async function getAllSideMenusWithAccess(req, res) {
  try {
    const userId = req.user.sub;

    const result =
      await SideMenuService.getAllSideMenusServiceWithAccess(userId);

    res.json({
      success: true,
      sidemenu: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
