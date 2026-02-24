import * as communityModel from "../models/community.model.js";

export const getCommunities = (clientId) =>
  communityModel.getCommunities(clientId);

export const createCommunity = (data) =>
  communityModel.createCommunity(data);

export const updateCommunity = (communityId, data) =>
  communityModel.updateCommunity(communityId, data);

export const deleteCommunity = (communityId) =>
  communityModel.deleteCommunity(communityId);