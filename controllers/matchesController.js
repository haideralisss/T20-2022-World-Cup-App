const Match = require("../modals/matches");
const Tm = require("../modals/team");

const fetchMatchesData = async (req, res) => {
    const match = await Match.find();
    res.json( { match }) ;
};

const fetchSingleMatchData = async (req, res) => {
    const matchId = req.params.id;
    const match = await Match.findById(matchId);
    res.json( { match } );
};

const fetchTeamWins = async (req, res) => {
    const teamName = req.params.teamName;
    const wins = await Match.countDocuments({ winner: teamName });
    res.json({ wins });
  };
  
const fetchTeamLosses = async (req, res) => {
  const teamName = req.params.teamName;
  const teamID = req.params.teamId;
  const losses = await Match.countDocuments({
    $and: [
      { $or: [{ f_id: teamID }, { s_id: teamID }] },
      { winner: { $ne: teamName } }
    ]
  });
  
  res.json({ losses });
};

const fetchGroupMatches = async (req, res) => {
    const groupNo = req.params.groupNo;
    const match = await Match.find({ group: groupNo });
    res.json( { match } );
};

const createMatchDocument = async (req, res) => {
    const {firstTeam_name, secondTeam_name, result, venue, f_total, f_extras, f_overs, s_total, s_extras, s_overs,
    date, highlights, category, winner, group, match_number} = req.body;
    const team1Data = await Tm.findOne({country: firstTeam_name});
    const team2Data = await Tm.findOne({country: secondTeam_name});
    const match = await Match.create({
        f_id: team1Data._id.toString(),
        s_id: team2Data._id.toString(),
        result,
        venue,
        f_total,
        f_extras,
        f_overs,
        s_total,
        s_extras,
        s_overs,
        date,
        highlights,
        category,
        winner,
        group,
        match_number,
    });
    res.json( { match } );
};

const enterFileData = async (row) => {
    const team1Data = await Tm.findOne({country: row._0});
    const team2Data = await Tm.findOne({country: row._1});
    const result = await Match.create({
        f_id: team1Data._id.toString(),
        s_id: team2Data._id.toString(),
        result: row._2,
        venue: row._3,
        f_total: row._4,
        f_extras: row._5,
        f_overs: row._6,
        s_total: row._7,
        s_extras: row._8,
        s_overs: row._9,
        date: row._10,
        highlights: row._11,
        category: row._12,
        winner: row._13,
        group: row._14,
        match_number: row._15
    });
    console.log(results)
}

const updateMatchData = async (req, res) => {
    const matchId = req.params.id;
    const {f_id, s_id, result, venue, f_total, f_extras, f_overs, s_total, s_extras, s_overs,
        date, highlights, category, winner, group, match_number} = req.body;
    await Match.findByIdAndUpdate(matchId, {
        f_id,
        s_id,
        result,
        venue,
        f_total,
        f_extras,
        f_overs,
        s_total,
        s_extras,
        s_overs,
        date,
        highlights,
        category,
        winner,
        group,
        match_number, 
    });
    const match = await Match.findById(matchId);
    res.json( { match } );
};

const deleteMatchData = async(req, res) => {
    const matchId = req.params.id;
    await Match.deleteOne( { _id: matchId } );
    const match = await Match.find();
    res.json( { match }) ;
};

module.exports = {
    fetchMatchesData: fetchMatchesData,
    fetchSingleMatchData: fetchSingleMatchData,
    createMatchDocument: createMatchDocument,
    updateMatchData: updateMatchData,
    deleteMatchData: deleteMatchData,
    enterFileData: enterFileData,
    fetchTeamWins: fetchTeamWins,
    fetchTeamLosses: fetchTeamLosses,
    fetchGroupMatches: fetchGroupMatches
}