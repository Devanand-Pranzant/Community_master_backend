import * as communityService from "../services/community.service.js";

export const getCommunities = async (req, res) => {
  try {
    const { client_id } = req.params;
    const data = await communityService.getCommunities(client_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCommunity = async (req, res) => {
  try {
    const data = await communityService.createCommunity(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCommunity = async (req, res) => {
  try {
    const { community_id } = req.params;
    const data = await communityService.updateCommunity(
      community_id,
      req.body
    );
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCommunity = async (req, res) => {
  try {
    const { community_id } = req.params;
    const data = await communityService.deleteCommunity(community_id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};