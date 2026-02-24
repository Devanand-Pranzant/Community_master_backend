import * as service from "../services/projectRoleService.js";

export async function createRole(req, res) {
  try {
    const role = await service.createRole(req.body);
    res.json({ success: true, data: role });
  } catch {
    res.status(500).json({ success: false });
  }
}

export async function getRoles(req, res) {
  try {
    const roles = await service.getRoles(req.params.projectId);
    res.json({ success: true, data: roles });
  } catch {
    res.status(500).json({ success: false });
  }
}
