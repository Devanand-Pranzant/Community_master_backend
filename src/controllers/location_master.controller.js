const model = require("../models/location_master.model");


// =============================
// GET COUNTRIES
// =============================
exports.getCountries = async (req,res)=>{

try{

const data = await model.getCountries();

res.json({
success:true,
data
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};



// =============================
// GET CITIES BY COUNTRY
// =============================
exports.getCitiesByCountry = async (req,res)=>{

try{

const countryId = req.params.country_id;

const data = await model.getCitiesByCountry(countryId);

res.json({
success:true,
data
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};