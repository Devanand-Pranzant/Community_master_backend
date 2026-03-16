require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


//CUSTOMER DASHBOARD ROUTES
app.use("/api/customer-dashboard", require("./src/routes/customerDashboard.routes"));

// COMMUNITY, PROPERTY, UNIT ROUTES

app.use("/api/communities", require("./src/routes/community.routes"));
app.use("/api/properties", require("./src/routes/property.routes"));
app.use("/api/units", require("./src/routes/unit.routes"));
// CUSTOMER ROUTES
app.use("/api/customers", require("./src/routes/customer.routes"));

app.use("/api/location", require("./src/routes/location_master.routes"));


//CUSTOMER DASHBOARD ROUTES
app.use("/api/customer-dashboard", require("./src/routes/customerDashboard.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});