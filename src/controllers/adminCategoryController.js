import * as service from "../services/adminCategoryService.js";

export async function createCategory(req, res) {
  try {
    const category = await service.createCategory(req.body);
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await service.getCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}
