import * as unitService from "../services/unit.service.js";

export const getUnits = async (req, res) => {
  try {
    const { client_id, community_id, property_id } = req.params;
    const data = await unitService.getUnits(
      client_id,
      community_id,
      property_id
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUnit = async (req, res) => {
  try {
    const data = await unitService.createUnit(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const data = await unitService.updateUnit(unit_id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const data = await unitService.deleteUnit(unit_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};