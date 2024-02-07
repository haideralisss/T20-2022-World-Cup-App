// Import dependencies
const express = require('express');
const cors = require('cors')
const connectToDb = require("./config/connectToDb");
const path = require("path");
const teamsController = require("./controllers/teamController");
const playersController = require("./controllers/playerController");
const matchesController = require("./controllers/matchesController");
const battingStatsController = require("./controllers/battingStatsController");
const bowlingStatsController = require("./controllers/bowlingStatsController");
const teamController = require("./controllers/teamController");

// Create an express app
const app = express();

app.use(cors());

// Configure an express app
app.use(express.json());

// Connect to database
connectToDb();

// Routing for the teams entity
app.get('/teams', teamsController.fetchTeamsData);

app.get('/teams/:id', teamsController.fetchSingleTeamData);

app.get("/teams/country/:id", teamController.fetchMatchStats);

app.get("/teams/captain/:id", teamController.fetchTeamByTeamName);

app.post('/teams', teamsController.createTeamDocument);

app.put('/teams/:id', teamsController.updateTeamData);

app.delete('/teams/:id', teamsController.deleteTeamData);

// Routing for the Player entity
app.get('/players', playersController.fetchPlayersData);

app.get('/players/:id', playersController.fetchSinglePlayerData);

app.get('/players/role/:id', playersController.fetchBatsManData);

app.post('/players', playersController.createPlayerDocument);

app.put('/players/:id', playersController.updatePlayerData);

app.delete('/players/:id', playersController.deletePlayerData);

app.get("/players/team/:id", playersController.fetchPlayersByTeamId);

// Routing for the Match entity
app.get('/matches', matchesController.fetchMatchesData);

app.get('/matches/:id', matchesController.fetchSingleMatchData);

app.get('/matches/teamStats/:teamName/wins', matchesController.fetchTeamWins);

app.get('/matches/teamStats/:teamId/:teamName/losses', matchesController.fetchTeamLosses);

app.get('/matches/group/:groupNo', matchesController.fetchGroupMatches);

app.post('/matches', matchesController.createMatchDocument);

app.put('/matches/:id', matchesController.updateMatchData);

app.delete('/matches/:id', matchesController.deleteMatchData);

// Routing for the Batting Stats entity
app.get('/battingStats', battingStatsController.fetchBattingStatsData);

app.get('/battingStats/:id', battingStatsController.fetchSingleBattingStatsData);

app.get("/battingStats/runs/:id", battingStatsController.fetchMostRuns);

app.get("/battingStats/balls/:id", battingStatsController.fetchHighestRunsList);

app.get('/battingStats/matches/:matchno', battingStatsController.fetchMatchBattingStats);

app.get('/battingStats/player/:playerId', battingStatsController.fetchPlayerBattingStats);

app.get('/battingStats/wickets/:playerName', battingStatsController.fetchWicketStats);

app.get('/battingStats/fielding/:playerName', battingStatsController.fetchFielingStats);

app.post('/battingStats', battingStatsController.createBattingStatsDocument);

app.put('/battingStats/:id', battingStatsController.updateBattingStatsData);

app.delete('/battingStats/:id', battingStatsController.deleteBattingStatsData);

// Routing for the Bowling Stats entity
app.get('/bowlingStats', bowlingStatsController.fetchBowlingStatsData);

app.get('/bowlingStats/:id', bowlingStatsController.fetchSingleBowlingStatData);

app.get('/bowlingStats/balls/:id', bowlingStatsController.fetchBowlingData);

app.get('/bowlingStats/player/:playerId', bowlingStatsController.fetchPlayerBowlingStats);

app.get('/bowlingStats/matches/bowlingstats/:matchno', bowlingStatsController.fetchMatchBowlingStats);

app.post('/bowlingStats', bowlingStatsController.createBowlingStatsDocument);

app.put('/bowlingStats/:id', bowlingStatsController.updateBowlingStatsData);

app.delete('/bowlingStats/:id', bowlingStatsController.deleteBowlingStatsData);

app.use(express.static(path.join(__dirname, './build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(process.env.PORT);