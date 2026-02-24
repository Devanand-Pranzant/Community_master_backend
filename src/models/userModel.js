import { pool } from "../config/db.js";

export const registerUser = (d) =>
  pool.query("SELECT * FROM register_user_with_email_otp($1,$2,$3)", [
    d.name,
    d.email,
    d.password,
  ]);

export const verifyEmailOtpByEmail = (email, otp) =>
  pool.query("SELECT * FROM verify_email_otp_by_email($1,$2)", [email, otp]);

export function resendEmailOtp(email) {
  return pool.query("SELECT * FROM resend_email_otp($1)", [email]);
}

// export const loginUser = (login, password) =>
//   pool.query("SELECT * FROM login_user($1,$2)", [login, password]);

export const loginUser = (login) =>
  pool.query("SELECT * FROM login_user($1)", [login]);

export const createUserSession = (...a) =>
  pool.query("SELECT * FROM create_user_session($1,$2,$3,$4,$5,$6)", a);

export const forgotPassword = (email) =>
  pool.query("SELECT * FROM forgot_password_send_otp($1)", [email]);

export const storeResetToken = (email, token) =>
  pool.query("SELECT * FROM store_reset_token($1,$2)", [email, token]);

export function resetPasswordByToken(resetToken, newPassword) {
  return pool.query("SELECT * FROM reset_password_by_token($1, $2)", [
    String(resetToken).trim(),
    newPassword,
  ]);
}

export const getUserPasswordById = (userId) =>
  pool.query("SELECT password_hash FROM users WHERE user_id = $1", [userId]);

// ...
export const updateUserPassword = (userId, passwordHash) =>
  pool.query(
    "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE user_id =$2",
    [passwordHash, userId],
  );

export const getUserProjects = (userId) =>
  pool.query(
    `SELECT project_id 
     FROM user_project_roles 
     WHERE user_id = $1 
     ORDER BY project_id ASC`,
    [userId],
  );

export const deleteUserSessions = (userId) =>
  pool.query("DELETE FROM user_sessions WHERE user_id = $1", [userId]);

export const refreshSessionToken = (...a) =>
  pool.query("SELECT * FROM refresh_session_token($1,$2,$3)", a);

export const logoutSession = (token) =>
  pool.query("SELECT * FROM logout_session($1)", [token]);

// export function getUserRoleIdByUserId(userId) {
//   return pool.query(
//     `
//     SELECT role_id
//     FROM public.users
//     WHERE user_id = $1
//       AND is_active = true
//     `,
//     [userId]
//   );
// }
