const model = require("../models/property.model");

exports.getAll = async (req, res) => {
  try {
    const data = await model.getAll(req.query.search || "");
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.property_image = `/uploads/${req.file.filename}`;
    }

    const result = await model.create(data);

    return res.status(200).json({
      success: true,
      message: "Property created successfully",
      data: result
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.property_image = `/uploads/${req.file.filename}`;
    const result = await model.update(req.params.id, data);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

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


exports.getById = async (req, res) => {
  try {
    const data = await model.getById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

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