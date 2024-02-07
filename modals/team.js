const { default: mongoose } = require("mongoose");

const teamSchema = new mongoose.Schema({
    country: String,
    captain: String
});

const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;