const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    seq: String,
    name: String,
    chart: String,
    storage_method: String,
    EE_DOC: [String],
    UD_DOC: [mongoose.Schema.Types.Mixed],

}, { versionKey: false });

const Medicine = mongoose.model('medicine', medicineSchema);

module.exports = Medicine;