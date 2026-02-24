import { pool } from "../config/db.js";

export function createAdminUser(data) {
  return pool.query(
    `
    INSERT INTO users
    (full_name, email, phone, password_hash, status)
    VALUES ($1,$2,$3,$4,'ACTIVE')
    RETURNING user_id, full_name, email
    `,
    [data.full_name, data.email, data.phone, data.password_hash],
  );
}

export function getAdminUsers() {
  return pool.query(`
    SELECT user_id, full_name, email, status, is_active
    FROM users
    ORDER BY full_name
  `);
}

export function getAdminUserById(userId) {
  return pool.query(
    `
    SELECT user_id, full_name, email, phone, status
    FROM users
    WHERE user_id=$1
    `,
    [userId],
  );
}

export function updateAdminUserStatus(userId, status) {
  return pool.query(
    `
    UPDATE users
    SET status=$1
    WHERE user_id=$2
    `,
    [status, userId],
  );
}
