<!-- # Authentication API Documentation

**Base URL:** `http://localhost:5000/api/users`  
**Content-Type:** `application/json`
==============================================================================

//This is endpoint Api for frontend  routing.....
POST   http://localhost:5000/api/users/register
POST   http://localhost:5000/api/users/verify-email-otp
POST   http://localhost:5000/api/users/resend-otp
POST   http://localhost:5000/api/users/login
POST   http://localhost:5000/api/users/forgot-password
POST   http://localhost:5000/api/users/reset-password
POST   http://localhost:5000/api/users/logout
GET    http://localhost:5000/api/users/sidemenu/:roleId

//=======================================================================================

//for profile page endpoints
GET  http://localhost:5000/api/profile/me

PUT  http://localhost:5000/api/profile/update

 post http://localhost:5000/api/profile/avatar







//api for development testing not for frontend..

POST   http://localhost:5000/api/users/test-smtp
POST   http://localhost:5000/api/users/test-send-otp

 -->






//---------postmon data for testing and frontend integration API tested ----


===========================================================
AUTH MANAGEMENT BACKEND
COMPLETE API DOCUMENTATION (FOR POSTMAN TESTING)
===========================================================

BASE URL:
http://localhost:5000

COMMON HEADERS:
Content-Type: application/json

For Protected APIs:
Authorization: Bearer <access_token>

===========================================================
1) AUTH / USER APIs
Base Path: /api/users
===========================================================

-----------------------------------------------------------
1. REGISTER USER
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/register

POSTMAN BODY (raw → JSON):
{
  "name": "Baban Pawar",
  "email": "baban@example.com",
  "password": "Password@123"
}

-----------------------------------------------------------
2. VERIFY EMAIL OTP
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/verify-email-otp

POSTMAN BODY:
{
  "email": "baban@example.com",
  "otp": "123456"
}

-----------------------------------------------------------
3. RESEND OTP
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/resend-otp

POSTMAN BODY:
{
  "email": "baban@example.com"
}

-----------------------------------------------------------
4. LOGIN USER
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/login

POSTMAN BODY:
{
  "email": "baban@example.com",
  "password": "Password@123"
}

-----------------------------------------------------------
5. FORGOT PASSWORD
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/forgot-password

POSTMAN BODY:
{
  "email": "baban@example.com"
}

-----------------------------------------------------------
6. RESET PASSWORD
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/reset-password

POSTMAN BODY:
{
  "email": "baban@example.com",
  "otp": "123456",
  "newPassword": "NewPassword@123"
}

-----------------------------------------------------------
7. CHANGE PASSWORD (PROTECTED)
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/change-password

HEADERS:
Authorization: Bearer <access_token>

POSTMAN BODY:
{
  "currentPassword": "Password@123",
  "newPassword": "NewPassword@123"
}

-----------------------------------------------------------
8. REFRESH TOKEN
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/refresh-token

POSTMAN BODY:
{
  "refreshToken": "your_refresh_token_here"
}

-----------------------------------------------------------
9. LOGOUT
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/users/logout

POSTMAN BODY:
{
  "refreshToken": "your_refresh_token_here"
}

===========================================================
2) PROFILE APIs
Base Path: /api/profile
===========================================================

-----------------------------------------------------------
1. GET MY PROFILE (PROTECTED)
-----------------------------------------------------------
METHOD: GET
URL: http://localhost:5000/api/profile/me

HEADERS:
Authorization: Bearer <access_token>

-----------------------------------------------------------
2. UPDATE PROFILE (PROTECTED)
-----------------------------------------------------------
METHOD: PUT
URL: http://localhost:5000/api/profile/update

HEADERS:
Authorization: Bearer <access_token>

POSTMAN BODY:
{
  "name": "Updated Name",
  "phone": "9876543210",
  "address": "Pune, Maharashtra"
}

-----------------------------------------------------------
3. UPLOAD AVATAR (PROTECTED)
-----------------------------------------------------------
METHOD: POST
URL: http://localhost:5000/api/profile/avatar

HEADERS:
Authorization: Bearer <access_token>

POSTMAN SETTINGS:
Body → form-data
Key: avatar
Type: File
Select image file

===========================================================
3) SIDEMENU API
Base Path: /api/sidemenu
===========================================================

-----------------------------------------------------------
GET SIDE MENU (PROTECTED)
-----------------------------------------------------------
METHOD: GET
URL: http://localhost:5000/api/sidemenu/

HEADERS:
Authorization: Bearer <access_token>

===========================================================
4) HEALTH CHECK APIs
===========================================================

-----------------------------------------------------------
ROOT CHECK
-----------------------------------------------------------
METHOD: GET
URL: http://localhost:5000/

EXPECTED RESPONSE:
{
  "success": true,
  "message": "Auth backend is running"
}

-----------------------------------------------------------
API HELLO CHECK
-----------------------------------------------------------
METHOD: GET
URL: http://localhost:5000/api/hello

EXPECTED RESPONSE:
{
  "message": "Hello from Backend"
}

===========================================================
AUTHENTICATION FLOW (POSTMAN TESTING ORDER)
===========================================================

1. Register
2. Verify OTP
3. Login
4. Copy Access Token
5. Use Access Token in Protected APIs

===========================================================
END OF FILE
===========================================================
