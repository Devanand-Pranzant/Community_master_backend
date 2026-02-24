import * as service from "../services/adminSidemenuService.js";

export async function createAdminSidemenu(req, res) {
  try {
    const { project_id, menu_name, menu_order } = req.body;

    if (!project_id || !menu_name || menu_order === undefined) {
      return res.status(400).json({
        success: false,
        message: "Project, Menu Name, and Order are required.",
      });
    }

    const result = await service.createAdminSidemenu(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getAdminSidemenuByProject(req, res) {
  try {
    const result = await service.getAdminSidemenuByProject(
      req.params.projectId,
    );
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

export async function updateAdminSidemenu(req, res) {
  try {
    const result = await service.updateAdminSidemenu(
      req.params.sideMenuId,
      req.body,
    );
    res.json({ success: true, data: result });
  } catch {
    res.status(500).json({ success: false });
  }
}

export async function deleteAdminSidemenu(req, res) {
  try {
    await service.deleteAdminSidemenu(req.params.sideMenuId);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
}
