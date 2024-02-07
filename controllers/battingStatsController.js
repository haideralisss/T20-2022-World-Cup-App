const BattingStats = require("../modals/battingStats");
const Pal = require("../modals/player");
const Mat = require("../modals/matches");
const Tm = require("../modals/team");

const fetchBattingStatsData = async (req, res) => {
    const battingStats = await BattingStats.find();
    res.json( { battingStats }) ;
};

const fetchSingleBattingStatsData = async (req, res) => {
    const battingStatsId = req.params.id;
    const battingStats = await BattingStats.findById(battingStatsId);
    res.json( { battingStats } );
};

const createBattingStatsDocument = async (req, res) => {
    const { player_name, runs, balls, fours, sixes, caught_by, wicket_by, 
        how_out, innings, wasMom, match_number, playing_position } = req.body;
    const playerData = await Pal.findOne({name: player_name});
    const matchData = await Mat.findOne({match_number: match_number});
    const battingStats = await BattingStats.create({
        player_id: playerData._id.toString(),
        match_id: matchData._id.toString(),
        player_name,
        runs,
        balls,
        fours,
        sixes,
        caught_by,
        wicket_by,
        how_out,
        innings,
        wasMom,
        playing_position
    });
    res.json( { battingStats } );
};

const fetchMostRuns = async (req, res) => {
  try {
    const playersData = await Pal.find();

    const teamData = await Tm.find();
    const runsData = [];

    for (const player of playersData) {
      const battingStats = await BattingStats.find({ player_id: player._id });
      let totalRuns = 0, totalBalls = 0, totalInnings = 0, totalOut = 0, totalFours = 0, totalSixes = 0, totalFifties = 0,
      totalHundreds = 0, strikeRate = 0;

      for (const stat of battingStats) {
        const runs = stat.runs !== "-" ? parseInt(stat.runs, 10) : 0;
        const balls = stat.balls !== "-" ? parseInt(stat.balls, 10) : 0;
        const howOut = stat.how_out !== "-" ? stat.how_out : null;
        totalRuns += runs;
        totalBalls += balls;
        stat.fours !== "-" ? totalFours += parseInt(stat.fours, 10) : totalFours;
        stat.sixes !== "-" ? totalSixes += parseInt(stat.sixes, 10) : totalSixes;
        stat.runs !== "-" ? totalInnings += 1 : totalInnings;
        if(howOut !== null) {
            stat.how_out.toLowerCase() !== "not out" ? totalOut += 1 : totalOut;
        }
        (runs >= 50 && runs < 100) ? totalFifties += 1 : totalFifties;
        runs >= 100 ? totalHundreds += 1 : totalHundreds;
        strikeRate = (totalRuns / totalBalls) * 100;
      }

      if (totalRuns !== 0) {
        teamData.map((team) => {
            if (team._id.toString() === player.teamid){
                runsData.push({ player_id: player._id, totalRuns, country: team.country, 
                                player_name: player.name, totalInnings, totalOut,
                                totalFours, totalSixes, totalFifties, totalHundreds, strikeRate });
            }
        })
      }
    }
    runsData.sort((a, b) => b.totalRuns - a.totalRuns);
    res.json({ runsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

const fetchHighestRunsList = async (req, res) => {
    const playersData = await Pal.find();
    const teamData = await Tm.find();
    const _highestScoreList = [];
    let strikeRate = 0, balls = 0, totalOut = 0;

    for (const player of playersData) {
        let highestRuns = 0;
        let isNotOut = true;
        const battingStats = await BattingStats.find({player_id: player._id});
        battingStats.map((stat) => {
            const runs = stat.runs !== "-" ? parseInt(stat.runs, 10) : 0;
            const howOut = stat.how_out !== "-" ? stat.how_out : null;
            if (parseInt(stat.runs) > highestRuns) {
                highestRuns = parseInt(stat.runs, 10);
                balls = stat.balls !== "-" ? parseInt(stat.balls, 10) : 0;
                stat.how_out.toLowerCase() === "not out" ? isNotOut = !isNotOut : isNotOut; 
            }
            if(howOut !== null) {
                stat.how_out.toLowerCase() !== "not out" ? totalOut += 1 : totalOut;
            }
        });
        strikeRate = (highestRuns / balls) * 100;
        teamData.map((team) => {
            if (team._id.toString() === player.teamid) {
                _highestScoreList.push({player_id : player._id, highestRuns,
                                        country: team.country, player_name: player.name,
                                        isNotOut, strikeRate});
            }
        });
    }
    _highestScoreList.sort((a, b) => b.highestRuns - a.highestRuns);
    res.json({ _highestScoreList });
}

const fetchPlayerBattingStats = async (req, res) => {
    const playerId = req.params.playerId;
    const battingStats = await BattingStats.find({ player_id: playerId });
    res.json({ battingStats });
};

const fetchMatchBattingStats = async (req, res) => {
    const matchNum = req.params.matchno;
    const battingStats = await BattingStats.find({ match_id: matchNum });
    res.json({ battingStats });
};

const fetchWicketStats = async (req, res) => {
    try {
      const playerName = req.params.playerName;
      const battingStats = await BattingStats.find({ wicket_by: playerName, how_out: { $ne: "Run Out" } });
  
      const wicketStats = {
        "CaughtOut": 0,
        "Stumped": 0,
        "Bowled": 0,
        "LBW": 0
      };
  
      battingStats.forEach(stat => {
        const { wicket_by, how_out } = stat;
        if (how_out === 'CaughtOut' || how_out === 'Stumped' || how_out === 'Bowled' || how_out === 'LBW') {
          if (wicket_by === playerName) {
            wicketStats[how_out]++;
          }
        }
      });
  
      res.json({ wicketStats });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching wicket stats' });
    }
  };

  const fetchFielingStats = async (req, res) => {
    try {
        const playerName = req.params.playerName;
          
          const caughtCount = await BattingStats.countDocuments({ caught_by: playerName, how_out: { $ne: "Stumped" } });
          const runOutCount = await BattingStats.countDocuments({ wicket_by: playerName, how_out: "Run Out" });
          const stumpedCount = await BattingStats.countDocuments({ how_out: "Stumped", caught_by: playerName });
        
            const fieldingStats = {
                caughtCount: caughtCount,
                runOutCount: runOutCount,
                stumpedCount: stumpedCount
            }

          res.json({ fieldingStats });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching fielding stats' });
      }
  };

const enterFileData = async (row, count) => {
    const playerData = await Pal.findOne({name: row._0.trim()});
    const matchData = await Mat.findOne({match_number: row._10});
    const battingStats = await BattingStats.create({
        player_id: playerData._id.toString(),
        match_id: matchData._id.toString(),
        player_name: row._0,
        runs: row._1,
        balls: row._2,
        fours: row._3,
        sixes: row._4,
        caught_by: row._5,
        wicket_by: row._6,
        how_out: row._7,
        innings: row._8,
        wasMom: row._9,
        playing_position: row._11,
    });
    console.log(battingStats);
}

const updateBattingStatsData = async (req, res) => {
    const battingStatsId = req.params.id;
    const { runs, balls, fours, sixes, how_out, caught_by, wicket_by, inning, wasMom, playing_position } = req.body;
    await BattingStats.findByIdAndUpdate(battingStatsId, {
        runs,
        balls,
        fours,
        sixes,
        caught_by,
        wicket_by,
        how_out,
        inning,
        wasMom,
        playing_position,
    });
    const battingStats = await BattingStats.findById(battingStatsId);
    res.json( { battingStats } );
};

const deleteBattingStatsData = async(req, res) => {
    const battingStatsId = req.params.id;
    await BattingStats.deleteOne( { _id: battingStatsId } );
    const battingStats = await BattingStats.find();
    res.json( { battingStats }) ;
};

module.exports = {
    fetchBattingStatsData: fetchBattingStatsData,
    fetchSingleBattingStatsData: fetchSingleBattingStatsData,
    createBattingStatsDocument: createBattingStatsDocument,
    updateBattingStatsData: updateBattingStatsData,
    deleteBattingStatsData: deleteBattingStatsData,
    enterFileData: enterFileData,
    fetchMostRuns: fetchMostRuns,
    fetchHighestRunsList: fetchHighestRunsList,
    fetchPlayerBattingStats: fetchPlayerBattingStats,
    fetchMatchBattingStats: fetchMatchBattingStats,
    fetchWicketStats: fetchWicketStats,
    fetchFielingStats: fetchFielingStats
}