const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    id:  String,
    password: String,
    name: String,
    h_id: {
        type: Number,
        default:0
    },
    license: Number,
    major: String,
}, { versionKey : false });

const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;