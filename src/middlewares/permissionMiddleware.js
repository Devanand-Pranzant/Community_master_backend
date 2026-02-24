import * as SideMenuService from "../services/sidemenuService.js";

export function permissionMiddleware(pageUrl) {
  return async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const { projectId } = req.params;

      const allowed = await SideMenuService.hasRouteAccess(
        userId,
        projectId,
        pageUrl,
      );

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message: "Access Denied",
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
