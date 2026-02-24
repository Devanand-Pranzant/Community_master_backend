import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import sidemenuRoutes from "./src/routes/sidemenuRoutes.js";

import adminCategoryRoutes from "./src/routes/adminCategoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import projectRoleRoutes from "./src/routes/projectRoleRoutes.js";
import adminSidemenuRoutes from "./src/routes/adminSidemenuRoutes.js";
import rolePermissionRoutes from "./src/routes/rolePermissionRoutes.js";
import userProjectRoleRoutes from "./src/routes/userProjectRoleRoutes.js";
import adminUserRoutes from "./src/routes/adminUserRoutes.js";


//==================== master project routes ====================
import communityRoutes from "./src/routes/community.routes.js";
import propertyRoutes from "./src/routes/property.routes.js";
import unitRoutes from "./src/routes/unit.routes.js";





import path from "path";
import cors from "cors";
// const cors = require("cors");

const app = express();

// app.use((req, res, next) => {
//   console.log("🔥 Incoming:", req.method, req.url);
//   next();
// });

// app.use(cors()); // allow frontend access

/* ================= CORS ================= */
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5174",
        "http://localhost:5173",
        "http://localhost:8000",
        "http://192.168.1.45:8000",
        "http://192.168.1.11:5173",
        process.env.CLIENT_URL,
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= ROUTES ================= */
app.use("/api/users", userRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);

app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Backend" });
});

/* SIDEMENU ROUTES */
app.use("/api/sidemenu", sidemenuRoutes);

/* ADMIN SIDEMENU ROLE PERMISSION ROUTES */
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/projects", projectRoutes);
app.use("/api/admin/project-roles", projectRoleRoutes);
app.use("/api/admin/sidemenu", adminSidemenuRoutes);
app.use("/api/admin/role-permissions", rolePermissionRoutes);
app.use("/api/admin/user-project-role", userProjectRoleRoutes);
app.use("/api/admin/users", adminUserRoutes);


//==================== master project routes ====================
app.use("/api/communities", communityRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/units", unitRoutes);

/* ================= HEALTH CHECK ================= */



app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth backend is running 🚀",
  });
});
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 8000;
const HOST = "0.0.0.0";

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT} sucessfully`);
});
