const mongoose = require("mongoose");

const battingStatsSchema = mongoose.Schema({
    player_id: String,
    match_id: String,
    player_name: String,
    runs: String,
    balls: String,
    fours: String,
    sixes: String,
    caught_by: String,
    wicket_by: String,
    how_out: String,
    innings: Number,
    wasMom: String,
    playing_position: String,
});

const BattingStats = mongoose.model('BattingStats', battingStatsSchema);

module.exports = BattingStats;