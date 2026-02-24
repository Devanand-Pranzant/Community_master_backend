import * as model from "../models/adminUserModel.js";
import bcrypt from "bcrypt";

export async function createAdminUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await model.createAdminUser({
    ...data,
    password_hash: hashedPassword,
  });

  return result.rows[0];
}

export async function getAdminUsers() {
  const result = await model.getAdminUsers();
  return result.rows;
}

export async function getAdminUserById(userId) {
  const result = await model.getAdminUserById(userId);
  return result.rows[0];
}

export async function updateAdminUserStatus(userId, status) {
  await model.updateAdminUserStatus(userId, status);
}
