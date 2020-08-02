const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    sickCd: String,
    sickNm: String,
}, { versionKey: false });

const Disease = mongoose.model('disease', diseaseSchema);

module.exports = Disease;