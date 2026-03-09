const model = require("../models/property.model");

exports.getAll = async (req, res) => {
  try {
    const data = await model.getAll(req.query.search || "");
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// exports.create = async (req, res) => {
//   try {
//     //const data = req.body;
//     const data = req.body.data ? JSON.parse(req.body.data) : req.body;

//     if (req.file) {
//       data.property_image = `/uploads/${req.file.filename}`;
//     }

//     const result = await model.create(data);

//     return res.status(200).json({
//       success: true,
//       message: "Property created successfully",
//       data: result
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

exports.create = async (req, res) => {
  try {
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;
    console.log("Incoming Data:", data);

    if (req.file) {
      data.property_image = `/uploads/${req.file.filename}`;
    }

    console.log("Incoming Data:", data);   // 👈 ADD THIS

    const result = await model.create(data);

    console.log("DB Result:", result);     // 👈 ADD THIS

    return res.status(200).json({
      success: true,
      message: "Property created successfully",
      data: result
    });

  } catch (err) {
    console.error("Create Error:", err);   // 👈 ADD THIS

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// exports.update = async (req, res) => {
//   try {
//     const data = req.body;
//     if (req.file) data.property_image = `/uploads/${req.file.filename}`;
//     const result = await model.update(req.params.id, data);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.delete = async (req, res) => {
//   try {
//     const result = await model.delete(req.params.id, req.body.updated_by);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// exports.delete = async (id) => {
//   const result = await db.query(
//     "SELECT public.fn_delete_properties($1) AS result",
//     [id]
//   );
//   return result.rows[0].result;
// };

exports.update = async (req, res) => {
  try {
    let data = req.body;
    
    // Parse data if it's sent as a JSON string (for FormData)
    if (data.data) {
      data = JSON.parse(data.data);
    }
    
    // Handle file upload if present
    if (req.file) {
      data.property_image = `/uploads/${req.file.filename}`;
    }
    
    console.log("=== UPDATE DEBUG ===");
    console.log("Property ID:", req.params.id);
    console.log("Received data:", JSON.stringify(data, null, 2));
    
    const result = await model.update(req.params.id, data);
    
    console.log("Database result:", result);
    console.log("=== END DEBUG ===");
    
    if (result.success === false) {
      return res.status(400).json(result);
    }
    
    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: result
    });
    
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const result = await model.delete(req.params.id);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property deleted permanently"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// exports.getById = async (req, res) => {
//   try {
//     const data = await model.getById(req.params.id);

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Property not found"
//       });
//     }

//     return res.json({
//       success: true,
//       data
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };


// In your property.controller.js - getById
exports.getById = async (req, res) => {
  try {
    const data = await model.getById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    console.log("getById returning:", data); // Debug log

    return res.json({
      success: true,
      data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getByCommunity = async (req, res) => {
  try {
    const communityId = req.params.community_id;

    const data = await model.getByCommunity(communityId);

    return res.json({
      success: true,
      data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};