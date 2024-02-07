const Player = require("../modals/player");

const fetchPlayersData = async (req, res) => {
    const player = await Player.find();
    res.json( { player } );
};

const fetchSinglePlayerData = async (req, res) => {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    res.json( { player } );
};

const fetchPlayersByTeamId = async (req, res) => {
    const teamId = req.params.id;
    const player = await Player.find({teamid: teamId});
    res.json({ player });
}

const fetchBatsManData = async (req, res) => {
    try{
        const players = await Player.find({ role: { $in: ["Batter", "All-rounder", "Wicket-keeper"] } });
        res.json({ players });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
}

const createPlayerDocument = async (req, res) => {
    const { name, dob, role, battingstyle, bowlingstyle } = req.body;
    const player = await Player.create({
        name,
        dob,
        role,
        battingstyle,
        bowlingstyle
    });
    res.json( { player } );
};


const enterFileData = async (row) => {
  
    const result = await Player.create({
      teamid: row._0,
      name: row._1,
      dob: row._2, 
      role: row._3,
      battingstyle: row._4,
      bowlingstyle: row._5,
    });
  
    console.log(result);
  };
  
const updatePlayerData = async (req, res) => {
    const playerId = req.params.id;
    const { name, dob, role, battingstyle, bowlingstyle } = req.body;
    await Player.findByIdAndUpdate(playerId, {
        name,
        dob,
        role,
        battingstyle,
        bowlingstyle
    });
    const player = await Player.findById(playerId);
    res.json( { player } );
};

const deletePlayerData = async(req, res) => {
    const playerId = req.params.id;
    await Player.deleteOne( { _id: playerId } );
    const player = await Player.find();
    res.json( { player } );
};

module.exports = {
    fetchPlayersData: fetchPlayersData,
    fetchSinglePlayerData: fetchSinglePlayerData,
    createPlayerDocument: createPlayerDocument,
    updatePlayerData: updatePlayerData,
    deletePlayerData: deletePlayerData,
    enterFileData: enterFileData,
    fetchPlayersByTeamId: fetchPlayersByTeamId,
    fetchBatsManData: fetchBatsManData
}