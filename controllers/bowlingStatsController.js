const BowlingStats = require("../modals/bowlingStats");
const pal = require("../modals/player");
const match = require("../modals/matches");
const tm = require("../modals/team");

const fetchBowlingStatsData = async (req, res) => {
    const bowlingStats = await BowlingStats.find();
    res.json( { bowlingStats }) ;
};

const fetchSingleBowlingStatData = async (req, res) => {
    const bowlingStatsId = req.params.id;
    const bowlingStats = await BowlingStats.findById(bowlingStatsId);
    res.json( { bowlingStats } );
};

const fetchPlayerBowlingStats = async (req, res) => {
    const playerId = req.params.playerId;
    const bowlingStats = await BowlingStats.find({ player_id: playerId });
    res.json({ bowlingStats });
};

const fetchMatchBowlingStats = async (req, res) => {
    const matchNum = req.params.matchno;
    const bowlingStats = await BowlingStats.find({ match_id: matchNum });
    res.json({ bowlingStats });
};

const createBowlingStatsDocument = async (req, res) => {
    const { player_name, wickets, runs, overs, match_number, innings } = req.body;
    const playerData = await pal.findOne({name: player_name});
    const matchData = await match.findOne({match_number: match_number});
    const bowlingStats = await BowlingStats.create({
        player_id: playerData._id.toString(),
        match_id: matchData._id.toString(),
        player_name,
        wickets,
        runs,
        overs,
        innings
    });
    res.json( { bowlingStats } );
};

const enterFileData = async (row) => {
    const playerData = await pal.findOne({name: row._0.trim()});
    const matchData = await match.findOne({match_number: row._4});
    const bowlingStats = await BowlingStats.create({
        player_id: playerData._id.toString(),
        match_id: matchData._id.toString(),
        player_name: row._0,
        wickets: row._1,
        runs: row._2,
        overs: row._3,
        match_number: row._4,
        innings: row._5
    });
    console.log(bowlingStats);
}

const updateBowlingStatsData = async (req, res) => {
    const bowlingStatsId = req.params.id;
    const { player_name, wickets, runs, overs, innings } = req.body;
    await BowlingStats.findByIdAndUpdate(bowlingStatsId, {
        player_name,
        wickets,
        runs,
        overs,
        innings
    });
    const bowlingStats = await BowlingStats.findById(bowlingStatsId);
    res.json( { bowlingStats } );
};

const fetchBowlingData = async (req, res) => {
    const playersData = await pal.find({
        role: { $in: ["All-rounder", "Bowler"] },
      });

    const teams = await tm.find();

    let bowlingData = [];
    let bestFigWkts = 0, bestFigRuns = 0, bestBowlingFigures;

    for (const player of playersData) {
        let totalWickets = 0, totalRuns = 0, bestBowlingAverage = 0, totalBalls = 0, bestBowlingStrikeRate = 0,
        bestBowlingEconomy = 0, totalOvers = 0;
        const bowlingStats = await BowlingStats.find({player_id: player._id});
        for (const bowler of bowlingStats) {
            bowler.wickets !== "-" ? totalWickets += parseInt(bowler.wickets, 10) : totalWickets;
            bowler.runs !== "-" ? totalRuns += parseInt(bowler.runs, 10) : totalRuns;
            let oversInt = parseInt(bowler.overs, 10);
            let overs = parseFloat(bowler.overs, 1);
            totalOvers += overs;
            bowler.balls !== "-" ? totalBalls += ((oversInt * 6) + (overs - oversInt) * 10) : totalBalls;
            totalWickets !== 0 ? bestBowlingAverage = totalRuns / totalWickets : bestBowlingAverage;
            totalWickets !== 0 ? bestBowlingStrikeRate = totalBalls / totalWickets : bestBowlingStrikeRate;
            bestBowlingEconomy = totalRuns / totalOvers;
            if (bowler.wickets > bestFigWkts || (bowler.wickets === bestFigWkts && bowler.runs < bestFigRuns)) {
                bestFigWkts = bowler.wickets;
                bestFigRuns = bowler.runs;
              }
        }
        bestBowlingFigures = `${bestFigWkts}-${bestFigRuns}`;
        teams.map((team) => {
            if (team._id.toString() === player.teamid) {
                bowlingData.push({totalWickets, totalRuns, player_name: player.name,
                                    country: team.country, bestBowlingAverage,
                                    totalBalls, bestBowlingStrikeRate, bestBowlingEconomy,
                                    bestBowlingFigures, bestFigRuns, bestFigWkts});
            }
        });
        bestFigRuns = 0;
        bestFigWkts = 0;
        bestBowlingFigures = 0;
    }
    res.json({ bowlingData });
}

const deleteBowlingStatsData = async(req, res) => {
    const bowlingStatsId = req.params.id;
    await BowlingStats.deleteOne( { _id: bowlingStatsId } );
    const bowlingStats = await BowlingStats.find();
    res.json( { bowlingStats }) ;
};

module.exports = {
    fetchBowlingStatsData: fetchBowlingStatsData,
    fetchSingleBowlingStatData: fetchSingleBowlingStatData,
    createBowlingStatsDocument: createBowlingStatsDocument,
    updateBowlingStatsData: updateBowlingStatsData,
    deleteBowlingStatsData: deleteBowlingStatsData,
    enterFileData: enterFileData,
    fetchBowlingData: fetchBowlingData,
    fetchMatchBowlingStats: fetchMatchBowlingStats,
    fetchPlayerBowlingStats: fetchPlayerBowlingStats
}