import * as unitModel from "../models/unit.model.js";

export const getUnits = (clientId, communityId, propertyId) =>
  unitModel.getUnits(clientId, communityId, propertyId);

export const createUnit = (data) =>
  unitModel.createUnit(data);

export const updateUnit = (unitId, data) =>
  unitModel.updateUnit(unitId, data);

export const deleteUnit = (unitId) =>
  unitModel.deleteUnit(unitId);