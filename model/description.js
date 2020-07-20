const mongoose = require('mongoose');

const descriptionSchema = mongoose.Schema({
    seq: Number,
    patient:  String,
    doctor: String,
    disease: String,
    createDate: String,
}, { versionKey : false });

const Description = mongoose.model('description', descriptionSchema);

module.exports = Description;