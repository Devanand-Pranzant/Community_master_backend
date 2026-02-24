import * as propertyService from "../services/property.service.js";

export const getProperties = async (req, res) => {
  try {
    const { client_id, community_id } = req.params;
    const data = await propertyService.getProperties(
      client_id,
      community_id
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const data = await propertyService.createProperty(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const data = await propertyService.updateProperty(
      property_id,
      req.body
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const data = await propertyService.deleteProperty(property_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};