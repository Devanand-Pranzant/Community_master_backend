import * as service from "../services/rolePermissionService.js";

export async function assignPermission(req, res) {
  try {
    const { project_role_id, side_menu_id } = req.body;

    if (!project_role_id || !side_menu_id) {
      return res.status(400).json({
        success: false,
        message: "Role and Menu Item are required.",
      });
    }

    const result = await service.assignPermission(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getPermissions(req, res) {
  const result = await service.getPermissions(req.params.roleId);
  res.json({ success: true, data: result });
}
