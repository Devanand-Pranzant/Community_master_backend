import * as propertyModel from "../models/property.model.js";

export const getProperties = (clientId, communityId) =>
  propertyModel.getProperties(clientId, communityId);

export const createProperty = (data) =>
  propertyModel.createProperty(data);

export const updateProperty = (propertyId, data) =>
  propertyModel.updateProperty(propertyId, data);

export const deleteProperty = (propertyId) =>
  propertyModel.deleteProperty(propertyId);