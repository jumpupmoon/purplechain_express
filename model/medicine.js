const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    seq: String,
    name: String,
    chart: String,
    EE_DOC: Schema.types.Mixed,
    UD_DOC: Schema.types.Mixed

}, { versionKey: false });

const Medicine = mongoose.model('medicine', medicineSchema);

module.exports = Medicine;