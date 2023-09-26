// models/Facility.js
const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  facilityName: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  phone: String,
  assignedPhysician: String,
});

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;
