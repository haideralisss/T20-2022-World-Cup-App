const mongoose = require("mongoose");

const matchesSchema = mongoose.Schema({
    f_id: String,
    s_id: String,
    result: String,
    venue: String,
    f_total: String,
    f_extras: String,
    f_overs: String,
    s_total: String,
    s_extras: String,
    s_overs: String,
    date: Date,
    highlights: String,
    category: String,
    winner: String,
    group: String,
    match_number: String,
});

const matches = mongoose.model('matches', matchesSchema);

module.exports = matches;