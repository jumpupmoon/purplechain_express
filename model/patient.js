const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    name: String,
    ssn: String,
    tel: String,
  },
  { versionKey: false }
);

const Patient = mongoose.model("patient", PatientSchema);

module.exports = Patient;
