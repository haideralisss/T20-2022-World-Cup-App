import React, { useState, useRef, useEffect, useContext } from 'react';
import UpperStatsCard from './components/UpperStatsCard';
import LowerStatsCard from './components/LowerStatsCard';
import './statistics.css';
import 'font-awesome/css/font-awesome.min.css';
import { Player } from "@lottiefiles/react-lottie-player";
import cricketBowled from "../../assets/images/animations/cricketBowled.json";
import axios from 'axios';
import { ImageContext } from '../../assets/utils/ImageContext';
import MostRuns from "./components/BattingStats/MostRuns";
import HighestRuns from './components/BattingStats/HighestRuns';
import MostFours from './components/BattingStats/MostFours';
import MostSixes from './components/BattingStats/MostSixes';
import MostFifties from './components/BattingStats/MostFifties';
import MostHundreds from './components/BattingStats/MostHundreds';
import FastestHundreds from './components/BattingStats/FastestHundreds';
import BestBattingAverage from './components/BattingStats/BestBattingAverage';
import BestBattingStrikeRate from './components/BattingStats/BestBattingStrikeRate';
import BestBattingStrikeRateInnings from './components/BattingStats/BestBattingStrikeRateInnings';
import MostWickets from './components/BowlingStats/MostWickets';
import BestBowlingAverage from './components/BowlingStats/BestBowlingAverage';
import BestBowlingStrikeRate from './components/BowlingStats/BestBowlingStrikeRate';
import BestBowlingEconomy from './components/BowlingStats/BestBowlingEconomy';
import BestBowlingFigures from './components/BowlingStats/BestBowlingFigures';
import BestWinPercentage from './components/TeamStats/BestWinPercentage';
import MostWins from './components/TeamStats/MostWins';
import MostLosses from './components/TeamStats/MostLosses';
import HighestMatchAggregate from './components/TeamStats/HighestMatchAggregate';
import { Link } from 'react-router-dom';

function Statistics() {

    const imageMap = useContext(ImageContext);
    const [isBattingActive, setIsBattingActive] = useState(false);
    const [isBowlingActive, setIsBowlingActive] = useState(false);
    const [isTeamActive, setIsTeamActive] = useState(false);
    const [activeElement, setActiveElement] = useState("Most Runs");
    const [teamsData, setTeamsData] = useState(null);
    const [matchesData, setMatchesData] = useState(null);
    const [battingStats, setBattingStats] = useState(null);
    const [playersData, setPlayersData] = useState(null);
    const [playerFirstNameRuns, setPlayerFirstNameRuns] = useState(null);
    const [playerSecondNameRuns, setPlayerSecondNameRuns] = useState(null);
    const [country, setCountry] = useState(null);
    const [highestRuns, setHighestRuns] = useState(null);
    const [mostRuns, setMostRuns] = useState(null);
    const [mostWickets, setMostWickets] = useState(null);
    const [mostWicketsTeam, setMostWicketsTeam] = useState(null);
    const [bestWinningPercentage, setBestWinningPercentage] = useState(null);
    const [bestTeam, setBestTeam] = useState(null);
    const [highestInningsScored, setHighestScored] = useState(null);
    const [highestScoredCountry, setHighestScoredCountry] = useState(null);
    const [winningTeamA, setWinningTeamA] = useState(null);
    const [winningTeamB, setWinningTeamB] = useState(null);
    const [highestAggregate, setHighestAggregate] = useState(null);
    const [mostRunsPlayerFirstName, setMostRunsPlayerFirstName] = useState(null);
    const [mostRunsPlayerSecondName, setMostRunsPlayerSecondName] = useState(null);
    const [mostRunsCountry, setMostRunsCountry] = useState(null);
    const [mostWicketsPlayerFirstName, setMostWicketsPlayerFirstName] = useState(null);
    const [mostWicketsPlayerSecondName, setMostWicketsPlayerSecondName] = useState(null);
    const [activeTable, setActiveTable] = useState(<MostRuns />);
    const [column2, setColumn2] = useState("Player");
    const [column3, setColumn3] = useState("Team");
    const [column4, setColumn4] = useState("Runs");
    const [column5, setColumn5] = useState("Innings");
    const [column6, setColumn6] = useState("Batting Average");
    const teams = ['Afghanistan', 'Australia', 'Bangladesh', 'England', 'India', 'Ireland', 'Namibia', 
                   'Netherlands', 'New Zeland', 'Pakistan', 'Scotland', 'South Africa', 'Sri Lanka', 'United Arab Emirates',
                    'West Indies', 'Zimbabwe'];
    const words = activeElement.split(' ');
    const firstWord = words[0];
    const restOfWords = words.slice(1).join(' ');

    const battingDropdownRef = useRef(null);
    const bowlingDropdownRef = useRef(null);
    const teamDropdownRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(e) {
            if (battingDropdownRef.current && !battingDropdownRef.current.contains(e.target)) {
                setIsBattingActive(false);
            }
            if (bowlingDropdownRef.current && !bowlingDropdownRef.current.contains(e.target)) {
                setIsBowlingActive(false);
            }
            if (teamDropdownRef.current && !teamDropdownRef.current.contains(e.target)) {
                setIsTeamActive(false);
            }
        }

        const fetchTeamsData = async () => {
            const res = await axios.get("/teams");
            setTeamsData(res.data.team);
        }

        fetchTeamsData();

        const fetchMatchesData = async () => {
            const res = await axios.get("/matches");
            setMatchesData(res.data.match);
        }

        fetchMatchesData();

        const fetchBattingStatsData = async () => {
            const res = await axios.get("/battingStats");
            setBattingStats(res.data.battingStats);
        }

        fetchBattingStatsData();

        const fetchPlayersData = async () => {
            const res = await axios.get("/players");
            setPlayersData(res.data.player);
        }

        fetchPlayersData();

        const fetchMostRunsList = async () => {
            const res = await axios.get(`/battingStats/runs/MostRuns`);
            res.data.runsData.sort((a, b) => b.totalRuns - a.totalRuns);
            const playerName = res.data.runsData[0].player_name.split(" ");
            setMostRunsPlayerFirstName(playerName[0]);
            setMostRunsPlayerSecondName(playerName[1]);
            setMostRunsCountry(res.data.runsData[0].country);
            setMostRuns(res.data.runsData[0].totalRuns);
        }

        const findHighestScore = async () => {
            let _playerIndex = 0, highestScore = 0, p_id = "";
            const res = await axios.get("/battingStats");
            res.data.battingStats.map((item, index) => {
                if (parseInt(item.runs, 10) > highestScore) {
                    highestScore = item.runs;
                    _playerIndex = index;
                    p_id = item.player_id.toString();
                }
            });
            const name = res.data.battingStats[_playerIndex].player_name.split(' ');
            const pl = await axios.get(`/players/${p_id}`);
            const tm = await axios.get(`/teams/${pl.data.player.teamid.toString()}`);
            setCountry(tm.data.team.country);
            setPlayerFirstNameRuns(name[0]);
            setPlayerSecondNameRuns(name[1]);
            setHighestRuns(highestScore);
          }

          findHighestScore();
    
        fetchMostRunsList();

        const fetchMostWickets = async () => {
            const res = await axios.get("/bowlingStats/balls/MostWickets");
            res.data.bowlingData.sort((a, b) => b.totalWickets - a.totalWickets);
            const playerName = res.data.bowlingData[0].player_name.split(" ");
            setMostWicketsPlayerFirstName(playerName[0]);
            setMostWicketsPlayerSecondName(playerName[1]);
            setMostWicketsTeam(res.data.bowlingData[0].country);
            setMostWickets(res.data.bowlingData[0].totalWickets);
        }

        fetchMostWickets();

        const fetchBestWinningPercentage = async () => {
            const bestWinPercentage = await axios.get("/teams/country/bestWinPercentage");
            bestWinPercentage.data._teamStats.sort((a, b) => b.bestWinPercentage - a.bestWinPercentage);
            setBestTeam(bestWinPercentage.data._teamStats[0].country);
            setBestWinningPercentage(bestWinPercentage.data._teamStats[0].bestWinPercentage);
        }

        fetchBestWinningPercentage();

        const fetchHighestInningScored = async () => {
            const res = await axios.get("/matches");
            let highest = {
              runs: 0,
              wickets: 0,
            }, idToCheck = "";
          
            res.data.match.map((mt, index) => {
              let firstTeamRuns = 0, secondTeamRuns = 0, firstTeamWickets = 0, secondTeamWickets;
              mt.f_total !== "-" ? [firstTeamRuns, firstTeamWickets] = mt.f_total.split("/") : 
              firstTeamRuns = 0;
              mt.s_total !== "-" ? [secondTeamRuns, secondTeamWickets] = mt.s_total.split("/") : 
              secondTeamRuns = 0;
              const firstTeamScore = {
                runs: +firstTeamRuns,
                wickets: +firstTeamWickets,
              };
              const secondTeamScore = {
                runs: +secondTeamRuns,
                wickets: +secondTeamWickets,
              };
          
              if (firstTeamScore.runs > highest.runs) {
                highest = firstTeamScore;
                idToCheck = res.data.match[index].f_id;
              }
              if (secondTeamScore.runs > highest.runs) {
                highest = secondTeamScore;
                idToCheck = res.data.match[index].s_id;
              }
            });
            const tm = await axios.get(`/teams/${idToCheck}`);
            setHighestScoredCountry(tm.data.team.country);
            setHighestScored(`${highest.runs}/${highest.wickets}`);
          };
          

        fetchHighestInningScored();

        const fetchHighestMatchAggregate = async () => {
            let highestAggregate = 0, teamIndex = 0;
            const matches = await axios.get("/matches");
            matches.data.match.map((match, index) => {
                var totalRuns = parseInt(match.f_total, 10) + parseInt(match.s_total, 10);
                if (totalRuns > highestAggregate) {
                   highestAggregate = totalRuns;
                   teamIndex = index;
                }
            });
            const f_team = await axios.get(`/teams/${matches.data.match[teamIndex].f_id}`);
            const s_team = await axios.get(`/teams/${matches.data.match[teamIndex].s_id}`);

            setWinningTeamA(f_team.data.team.country);
            setWinningTeamB(s_team.data.team.country);
            setHighestAggregate(highestAggregate);
        }

        fetchHighestMatchAggregate();

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    

    return (
        <>
        {teamsData && matchesData && playersData
        && mostRuns && mostWickets && bestWinningPercentage &&
        highestInningsScored && highestAggregate && highestRuns && 
        <div className="stats">
            <div className="statsBg-img">
                <div className="header-text">
                    <h1>
                        Tournament Stats
                    </h1>
                </div>
                <div className='tournamentStats'>
                    <UpperStatsCard title="HIGHEST RUNS" flag={imageMap[country]} data={highestRuns} 
                    playerFirstName={playerFirstNameRuns} playerLastName={playerSecondNameRuns} team={country} />
                    <UpperStatsCard title="MOST RUNS" playerFirstName={mostRunsPlayerFirstName} 
                    playerLastName={mostRunsPlayerSecondName} flag={imageMap[mostRunsCountry]} data={mostRuns} team={mostRunsCountry} />
                    <UpperStatsCard title="MOST WICKETS" playerFirstName={mostWicketsPlayerFirstName} 
                    playerLastName={mostWicketsPlayerSecondName} flag={imageMap[mostWicketsTeam]} data={mostWickets} team={mostWicketsTeam} />
                </div>
            <div className='statsCard2'>
                    <div class="coverInside">
                        <p className='textInside'>{matchesData.length}</p>
                        <div className="coverOutside">
                            <p>MATCHES PLAYED</p>
                            <span className='lottieAnimationSpan'>
                                <Player className='lottieAnimation' src={cricketBowled} 
                                loop autoplay />
                            </span>
                        </div>
                    </div>
                    <LowerStatsCard title="HIGHEST INNINGS SCORED" data={highestInningsScored}
                    flag={imageMap[highestScoredCountry]} teamName={highestScoredCountry} />
                    <LowerStatsCard title="BEST WIN PERCENTAGE" data={`${bestWinningPercentage}%`} flag={imageMap[bestTeam]} teamName={bestTeam} />
                    <div className="coverInside">
                        <p className='textInside'>{highestAggregate}</p>
                        <span className='coverInsideData'>
                            <img className='flagImg' src={imageMap[winningTeamA]}  />
                            <h6 className='teamName1'>{winningTeamA}</h6>
                            <h6 className='vsWord'>  VS</h6>
                            <h6 className='teamName2'>{winningTeamB}</h6>
                            <img className='flagImg' src={imageMap[winningTeamB]} / >
                        </span>
                        <div className="coverOutside">
                            <p>MATCH HIGHEST RUNS</p>
                            <span className='lottieAnimationSpan'>
                                <Player className='lottieAnimation' src={cricketBowled} 
                                loop autoplay />
                            </span>
                        </div>
                    </div>
            </div>
        </div>
        <div className='statsSection'>
            <h2 className='cricketStatsWord'><span className='cricketWord'>Cricket</span> Stats</h2>
            <div className='filters'>
                <div className='dropdown' ref={battingDropdownRef}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setIsBattingActive(!isBattingActive);
                        if (isBowlingActive == true) {
                            setIsBowlingActive(!isBowlingActive);
                        }
                        if (isTeamActive == true) {
                            setIsTeamActive(!isTeamActive);
                        }
                    }}>
                        Batting Stats
                        <span className='fa fa-caret-down dropDownIcon'></span>
                    </div>
                    { isBattingActive && (
                    <div className='dropdown-content'>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Most Runs"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Runs"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<MostRuns />)}}>
                            Most Runs
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Highest Score (Innings)"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Highest Score"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<HighestRuns />)}}>
                            Highest Score (Innings)
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Best Batting Average"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Average"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<BestBattingAverage />)}}>
                            Best Batting Average
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Best Batting Strike Rate");setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Strike Rate"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<BestBattingStrikeRate />)}}>
                            Best Batting Strike Rate
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Best Batting Strike Rate (Innings)");setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Strike Rate"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<BestBattingStrikeRateInnings />)}}>
                            Best Batting Strike Rate (Innings)
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Most Fours"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("4s"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<MostFours />)}}>
                            Most Fours
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Most Sixes"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("6s"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<MostSixes />)}}>
                            Most Sixes
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Most Fifties"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("50s"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<MostFifties />)}}>
                            Most Fifties
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Most Hundreds"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("100s"); 
                            setColumn5("Innings"); setColumn6("Batting Average");
                            setActiveTable(<MostHundreds />)}}>
                            Most Hundreds
                        </div>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Fastest Hundreds"); setIsBattingActive(!isBattingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Highest Score"); 
                            setColumn5("Innings"); setColumn6("Batting Average")
                            setActiveTable(<FastestHundreds />);}}>
                            Fastest Hundreds
                        </div>
                    </div>
                    )}
                </div>
                <div className='dropdown' ref={bowlingDropdownRef}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setIsBowlingActive(!isBowlingActive);
                        if (isBattingActive) {
                            setIsBattingActive(!isBattingActive);
                        }
                        if (isTeamActive) {
                            setIsTeamActive(!isTeamActive);
                        }
                    }}>
                        Bowling Stats
                        <span className='fa fa-caret-down dropdownIcon'></span>
                    </div>
                    { isBowlingActive && (
                    <div className='dropdown-content'>
                        <div className='dropdown-item'  onClick={(e) => 
                            {setActiveElement("Most Wickets"); setIsBowlingActive(!isBowlingActive); 
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Wickets");
                            setColumn5("Innings"); setColumn6("Wickets");
                            setActiveTable(<MostWickets />)}}>
                            Most Wickets
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Best Bowling Figures (Innings)"); setIsBowlingActive(!isBowlingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Wickets");
                            setColumn5("Innings"); setColumn6("Wickets");
                            setActiveTable(<BestBowlingFigures />)}}>
                            Best Bowling Figures
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Best Bowling Average"); setIsBowlingActive(!isBowlingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Average");
                            setColumn5("Innings"); setColumn6("Wickets");
                            setActiveTable(<BestBowlingAverage />);}}>
                            Best Bowling Average
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Best Bowling Strike Rate"); setIsBowlingActive(!isBowlingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Strike Rate");
                            setColumn5("Innings"); setColumn6("Wickets")
                            setActiveTable(<BestBowlingStrikeRate />);}}>
                            Best Bowling Strike Rate
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Best Bowling Economy"); setIsBowlingActive(!isBowlingActive);
                            setColumn2("Player"); setColumn3("Team"); setColumn4("Economy");
                            setColumn5("Innings"); setColumn6("Wickets");
                            setActiveTable(<BestBowlingEconomy />)}}>
                            Best Bowling Economy
                        </div>
                    </div>
                    )}
                </div>
                <div className='dropdown' ref={teamDropdownRef}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setIsTeamActive(!isTeamActive);
                        if (isBattingActive) {
                            setIsBattingActive(!isBattingActive);
                        }
                        if (isBowlingActive) {
                            setIsBowlingActive(!isBowlingActive);
                        }
                    }}>
                        Team Stats
                        <span className='fa fa-caret-down dropDownIcon'></span>
                    </div>
                    { isTeamActive && (
                    <div className='dropdown-content'>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Best Win Percentage"); setIsTeamActive(!isTeamActive);
                            setColumn2("Team"); setColumn3("Win %"); setColumn4("Matches");
                            setColumn5("Wins"); setColumn6("Losses");
                            setActiveTable(<BestWinPercentage />)}}>
                            Best Win Percentage
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Highest Match Aggregate"); setIsTeamActive(!isTeamActive);
                            setColumn2("Team"); setColumn3("Aggregate Runs"); setColumn4("Against");
                            setColumn5("Venue"); setColumn6("Match Date");
                            setActiveTable(<HighestMatchAggregate />)}}>
                            Highest Match Aggregate
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Most Wins"); setIsTeamActive(!isTeamActive);
                            setColumn2("Team"); setColumn3("Wins"); setColumn4("Matches");
                            setColumn5("Wins"); setColumn6("Losses");
                            setActiveTable(<MostWins />)}}>
                            Most Wins
                        </div>
                        <div className='dropdown-item' onClick={(e) => 
                            {setActiveElement("Most Losses"); setIsTeamActive(!isTeamActive);
                            setColumn2("Team"); setColumn3("Losses"); setColumn4("Matches");
                            setColumn5("Wins"); setColumn6("Losses");
                            setActiveTable(<MostLosses />)}}>
                            Most Losses
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
        <div className={`statsData ${isBattingActive || isBowlingActive || isTeamActive ? 'active' : ''}`}>
            <span className='headingData'>
                <h1 className='statsHeading'><span>{firstWord}</span>&nbsp;{restOfWords}</h1>
                <Link to="/comparePlayers"><button className='comparePlayers'> Compare Players </button></Link>
            </span>
        <div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Position</th>
            <th>{column2}</th>
            <th>{column3}</th>
            <th>{column4}</th>
            <th>{column5}</th>
            <th>{column6}</th>
            <th>Runs</th>
        </tr>
        </thead>
        <tbody>
            {activeTable}
        </tbody>
    </table>
</div>
        </div>
        </div>
        }
        </>
    );
}

export default Statistics;