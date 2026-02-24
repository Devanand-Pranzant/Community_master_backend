import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as UserModel from "../models/userModel.js";
import { sendEmail } from "../utils/mailer.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/* ============================================================
 * OTP EMAIL TEMPLATE
 * ============================================================
 */
function otpEmailTemplate({ otp }) {
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Your OTP Code</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #F4F6F8;
  font-family: Arial, Helvetica, sans-serif;
">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="420" cellpadding="0" cellspacing="0" style="
          background-color: #FFFFFF;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        ">
          <!-- HEADER -->
          <tr>
            <td style="
              background-color: #4F46E5;
              color: #FFFFFF;
              text-align: center;
              padding: 14px;
              font-size: 16px;
              font-weight: 600;
            ">
              Your OTP Code
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding: 24px; font-size: 13px; color: #333333;">
              <p style="margin-top: 0;">Hello,</p>

              <p>
                Your One-Time Password (OTP) for account verification is:
              </p>

              <!-- OTP BOX -->
              <div style="
                background-color: #F3F4F6;
                border-radius: 6px;
                text-align: center;
                padding: 12px;
                margin: 16px 0;
              ">
                <span style="
                  font-size: 20px;
                  font-weight: 600;
                  color: #4F46E5;
                  letter-spacing: 2px;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size: 12px; color: #555555;">
                This OTP is valid for <strong>10 minutes</strong>.
                Please do not share this code with anyone.
              </p>

              <p style="font-size: 12px; color: #555555;">
                If you didn't request this code, please ignore this email.
              </p>

              <p style="font-size: 12px; margin-top: 16px;">
                Thank you for using our service!
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              background-color: #F8F9FA;
              text-align: center;
              padding: 10px;
              font-size: 11px;
              color: #888888;
            ">
              © ${year} All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/* ================= REGISTER ================= */
// export async function registerUserService(data) {
//   const r = await UserModel.registerUser(data);
//   const d = r.rows[0]?.register_user_with_email_otp;

//   if (!d?.success) return d;

//   if (d.otp) {
//     await sendEmail(
//       data.email,
//       "Your OTP Code",
//       otpEmailTemplate({ otp: d.otp })
//     );
//   }

//   return {
//     success: true,
//     user_id: d.user_id,
//     message:
//       "Verification OTP has been sent to your registered email address."
//   };
// }

export async function registerUserService(data) {
  // 🔐 HASH PASSWORD
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const r = await UserModel.registerUser({
    ...data,
    password: hashedPassword,
  });

  const d = r.rows[0]?.register_user_with_email_otp;

  if (!d?.success) return d;

  if (d.otp) {
    await sendEmail(
      data.email,
      "Your OTP Code",
      otpEmailTemplate({ otp: d.otp }),
    );
  }

  return {
    success: true,
    user_id: d.user_id,
    message: "Verification OTP has been sent to your email address.",
  };
}

/* ================= VERIFY OTP ================= */
export async function verifyEmailOtpService(email, otp) {
  const r = await UserModel.verifyEmailOtpByEmail(email, otp);
  const d = r.rows[0]?.verify_email_otp_by_email;

  if (!d?.success) {
    return { success: false, message: "Invalid or expired OTP" };
  }

  if (d.purpose === "reset") {
    const resetToken = crypto.randomBytes(32).toString("hex");
    await UserModel.storeResetToken(email, resetToken);

    return {
      success: true,
      reset_token: resetToken,
      next: "reset-password",
    };
  }

  return {
    success: true,
    next: "login",
    message: "Email verified successfully",
  };
}

/* ================= LOGIN ================= */
// export async function loginUserService(data) {
//   const r = await UserModel.loginUser(data.login, data.password);
//   const u = r.rows[0]?.login_user;

//   if (!u?.success) {
//     return {
//       success: false,
//       message: "Invalid login credentials."
//     };
//   }

//   const token = jwt.sign(
//     { sub: u.user_id, email: u.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   const sessionToken = crypto.randomBytes(32).toString("hex");

//   await UserModel.createUserSession(
//     u.user_id,
//     sessionToken,
//     data.userAgent,
//     data.ipAddress,
//     data.deviceName,
//     data.deviceFingerprint
//   );

//   return {
//     success: true,
//     user_id: u.user_id,
//     token,
//     session_token: sessionToken,
//     message: "Login successful."
//   };
// }

export async function loginUserService(data) {
  const r = await UserModel.loginUser(data.email);
  const u = r.rows[0]?.login_user;

  if (!u?.success) {
    return { success: false, message: "Invalid credentials" };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  // 🔐 bcrypt comparison
  const isMatch = await bcrypt.compare(data.password, u.password_hash);

  if (!isMatch) {
    return {
      success: false,
      message: "Invalid login credentials.",
    };
  }

  const token = jwt.sign(
    {
      sub: u.user_id,
      email: u.email,
    },
    process.env.JWT_SECRET,
    // { expiresIn: "1h" }
    { expiresIn: "5h" },
    // { expiresIn: "2m" }
  );

  const sessionToken = crypto.randomBytes(32).toString("hex");

  await UserModel.createUserSession(
    u.user_id,
    sessionToken,
    data.userAgent || null,
    data.ipAddress || null,
    data.deviceName || null,
    data.deviceFingerprint || null,
  );

  // Fetch user projects to set default projectId
  const projectsResult = await UserModel.getUserProjects(u.user_id);
  const defaultProjectId =
    projectsResult.rows.length > 0 ? projectsResult.rows[0].project_id : 16;

  // Construct user object for frontend
  const userObj = {
    id: u.user_id,
    user_id: u.user_id,
    email: u.email,
    name: u.name || u.username || "User", // Assuming these fields exist in u
    projectId: defaultProjectId,
    role: u.role || "user", // Pass role if it exists, else default
  };

  return {
    success: true,
    token,
    session_token: sessionToken,
    user: userObj,
  };
}

/* ================= FORGOT PASSWORD ================= */
export async function forgotPasswordService(email) {
  const r = await UserModel.forgotPassword(email);
  const d = r.rows[0]?.forgot_password_send_otp;

  if (d?.otp) {
    await sendEmail(email, "Your OTP Code", otpEmailTemplate({ otp: d.otp }));
  }

  return {
    success: true,
    message: "If email exists, OTP has been sent",
  };
}

/* ================= RESET PASSWORD ================= */
export async function resetPasswordService(resetToken, newPassword) {
  if (!resetToken || !newPassword) {
    return {
      success: false,
      message: "reset_token and newPassword are required.",
    };
  }

  // HASH PASSWORD
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  const r = await UserModel.resetPasswordByToken(resetToken, hashedPassword);
  const d = r.rows[0]?.reset_password_by_token;

  if (!d || d.success !== true) {
    return {
      success: false,
      message: "Invalid or expired reset token.",
    };
  }

  return {
    success: true,
    message: "Password reset successful.",
  };
}

/* ================= CHANGE PASSWORD ================= */
export async function changePasswordService(
  userId,
  currentPassword,
  newPassword,
) {
  const r = await UserModel.getUserPasswordById(userId);
  const user = r.rows[0];

  if (!user) {
    return { success: false, message: "User not found" };
  }

  // 🔐 VERIFY CURRENT PASSWORD
  const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

  if (!isMatch) {
    return {
      success: false,
      message: "Current password is incorrect",
    };
  }

  // 🔐 HASH NEW PASSWORD
  const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await UserModel.updateUserPassword(userId, newHash);

  return {
    success: true,
    message: "Password changed successfully",
  };
}

// export async function resendEmailOtpService(email) {
//   if (!email) {
//     return {
//       success: false,
//       message: "Email is required"
//     };
//   }

//   const r = await UserModel.resendEmailOtp(email);
//   const d = r.rows[0]?.resend_email_otp;

//   return d?.success
//     ? { success: true, message: "OTP resent successfully" }
//     : { success: false, message: "Failed to resend OTP" };
// }

export async function resendEmailOtpService(email) {
  const r = await UserModel.resendEmailOtp(email);
  const d = r.rows[0]?.resend_email_otp;

  console.log("RESEND OTP DB RESPONSE:", d); // 🔍 DEBUG

  if (!d?.otp) {
    return {
      success: false,
      message: "Failed to resend OTP",
    };
  }

  await sendEmail(email, "Your OTP Code", otpEmailTemplate({ otp: d.otp }));

  return {
    success: true,
    message: "OTP resent successfully",
  };
}

/* ================= SESSION ================= */
export async function refreshSessionTokenService(token, ua, ip) {
  const r = await UserModel.refreshSessionToken(token, ua, ip);
  const d = r.rows[0];

  if (!d?.success) {
    return {
      success: false,
      message: "Invalid or expired token. Please login again.",
    };
  }

  return {
    success: true,
    session_token: d.new_token,
    message: "Session refreshed successfully",
  };
}

/* ================= LOGOUT ================= */
export async function logoutSessionService(token) {
  const r = await UserModel.logoutSession(token);
  const d = r.rows[0]?.logout_session;

  return d?.success
    ? { success: true, message: "Logged out successfully" }
    : { success: false, message: "Logout failed" };
}
