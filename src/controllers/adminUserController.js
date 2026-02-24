import * as service from "../services/adminUserService.js";

export async function createAdminUser(req, res) {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required.",
      });
    }

    const result = await service.createAdminUser(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getAdminUsers(req, res) {
  try {
    const result = await service.getAdminUsers();
    res.json({ success: true, data: result });
  } catch {
    res.status(500).json({ success: false });
  }
}

export async function getAdminUserById(req, res) {
  try {
    const result = await service.getAdminUserById(req.params.userId);
    res.json({ success: true, data: result });
  } catch {
    res.status(500).json({ success: false });
  }
}

export async function updateAdminUserStatus(req, res) {
  try {
    await service.updateAdminUserStatus(req.params.userId, req.body.status);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
}
