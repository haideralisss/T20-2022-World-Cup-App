const Team = require("../modals/team");
const Match = require("../modals/matches");

const fetchTeamsData = async (req, res) => {
    const team = await Team.find();
    res.json( { team }) ;
};

const fetchSingleTeamData = async (req, res) => {
    const teamId = req.params.id;
    const team = await Team.findById(teamId);
    res.json( { team } );
};

const createTeamDocument = async (req, res) => {
    const {country, captain} = req.body;
    const team = await Team.create({
        country,
        captain
    });
    res.json( { team } );
};

const fetchTeamByTeamName = async (req, res) => {
    const teamName = req.params.id;
    const team = await Team.find({country: teamName});
    res.json({ team });
}

const enterFileData = async (row) => {
    const result = await Team.create({
        country: row._0,
        captain: row._1
    });
    console.log(result);
};

const updateTeamData = async (req, res) => {
    const teamId = req.params.id;
    const { country, captain } = req.body;
    await Team.findByIdAndUpdate(teamId, {
        country,
        captain
    });
    const team = await Team.findById(teamId);
    res.json( { team } );
};

const deleteTeamData = async(req, res) => {
    const teamId = req.params.id;
    await Team.deleteOne( { _id: teamId } );
    const team = await Team.find();
    res.json( { team }) ;
};

const fetchMatchStats = async (req, res) => {
    const teams = await Team.find();
    let _teamStats = [], bestWinPercentage = 0;
    for (const team of teams) {
        const matches = await Match.find({$or: [{f_id: team._id}, {s_id: team._id}]});
        let totalMatches = 0, totalWins = 0, totalLosses = 0;
        for (const match of matches ) {
            match.winner.toLowerCase() !== "no result" ? totalMatches++ : totalMatches;
            match.winner === team.country ? totalWins++ : match.winner.toLowerCase() !== "no result" ? totalLosses++ : totalLosses;
        }
        bestWinPercentage = ((parseInt(totalWins, 10) / parseInt(totalMatches, 10)) * 100).toFixed(1);
        _teamStats.push({country: team.country, totalMatches, totalWins, totalLosses, bestWinPercentage});
    }
    res.json({ _teamStats })
}

module.exports = {
    fetchTeamsData: fetchTeamsData,
    fetchSingleTeamData: fetchSingleTeamData,
    createTeamDocument: createTeamDocument,
    updateTeamData: updateTeamData,
    deleteTeamData: deleteTeamData,
    enterFileData: enterFileData,
    fetchMatchStats: fetchMatchStats,
    fetchTeamByTeamName: fetchTeamByTeamName
}