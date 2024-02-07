const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    teamid: String,
    name: String,
    dob: Date,
    role: String,
    battingstyle: String,
    bowlingstyle: String
});

const Player = mongoose.model('Players', playerSchema);

module.exports = Player;