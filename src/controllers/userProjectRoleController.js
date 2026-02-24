import * as service from "../services/userProjectRoleService.js";

export async function assignUserToProject(req, res) {
  try {
    await service.assignUserToProject(req.body);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
}

export async function getUserAssignments(req, res) {
  try {
    const result = await service.getUserAssignments(req.params.userId);
    res.json({ success: true, data: result });
  } catch {
    res.status(500).json({ success: false });
  }
}

export async function removeAssignment(req, res) {
  try {
    await service.removeAssignment(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
}
