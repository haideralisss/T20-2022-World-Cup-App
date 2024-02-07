const mongoose = require("mongoose");

const bowlingStatsSchema = mongoose.Schema({
    player_id: String,
    match_id: String,
    player_name: String,
    wickets: String,
    runs: String,
    overs: String,
    innings: String
});

const BowlingStats = mongoose.model("BowlingStats", bowlingStatsSchema);

module.exports = BowlingStats;