const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    name: String,
    location: String,
}, { versionKey : false });

const Hospital = mongoose.model('hospital', hospitalSchema);

module.exports = Hospital;