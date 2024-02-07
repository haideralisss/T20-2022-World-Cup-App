import React, { useEffect, useState, useContext } from "react";
import { ImageContext } from "../../../assets/utils/ImageContext";
import axios from "axios";
import BatStats from '../../../models/BatStats';
import BowlStats from '../../../models/BowlStats';
import England from "../../../assets/images/flags/england.jpg";

function PlayerData (props) {
    const [dob, setDOB] = useState('');
    const [flag, setFlag] = useState('#');
    const [battingStatsArr, setBattingStatsArr] = useState(null);
    const [bowlingStatsArr, setBowlingStatsArr] = useState(null);
    const [battingStats, setBattingStats] = useState(null);
    const [bowlingStats, setBowlingStats] = useState(null);
    const [wktStats, setWktStats] = useState(null);
    const [fieldingStats, setFieldingStats] = useState(null);
    const [player1Country, setPlayer1Country] = useState(null);
    const [player, setPlayer] = useState(null);
    const [dob2, setDOB2] = useState('');
    const [flag2, setFlag2] = useState('#');
    const [battingStatsArr2, setBattingStatsArr2] = useState(null);
    const [bowlingStatsArr2, setBowlingStatsArr2] = useState(null);
    const [battingStats2, setBattingStats2] = useState(null);
    const [bowlingStats2, setBowlingStats2] = useState(null);
    const [wktStats2, setWktStats2] = useState(null);
    const [fieldingStats2, setFieldingStats2] = useState(null);
    const [player2Country, setPlayer2Country] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const imageMap = useContext(ImageContext);

    useEffect(() => {
    
        const fetchPlayerData = async () => {
            try {
              const [res, resP2] = await Promise.all([
                axios.get(`/players/${props.player1Id}`),
                axios.get(`/players/${props.player2Id}`),
              ]);
          
              setPlayer(res.data.player);
              setPlayer2(resP2.data.player);
          
              const formattedDate = new Date(res.data.player.dob).toLocaleDateString();
              setDOB(formattedDate);
              const formattedDate2 = new Date(resP2.data.player.dob).toLocaleDateString();
              setDOB2(formattedDate2);
          
              const [res2, res2P2, res3, res3P3, res4, res4P4, res5, res5P5, res6, res6P6] = await Promise.all([
                axios.get(`/teams/${res.data.player.teamid}`),
                axios.get(`/teams/${resP2.data.player.teamid}`),
                axios.get(`/battingStats/player/${res.data.player._id}`),
                axios.get(`/battingStats/player/${resP2.data.player._id}`),
                axios.get(`/bowlingStats/player/${res.data.player._id}`),
                axios.get(`/bowlingStats/player/${resP2.data.player._id}`),
                axios.get(`/battingStats/wickets/${res.data.player.name}`),
                axios.get(`/battingStats/wickets/${resP2.data.player.name}`),
                axios.get(`/battingStats/fielding/${res.data.player.name}`),
                axios.get(`/battingStats/fielding/${resP2.data.player.name}`),
              ]);
          
              const flagImg = imageMap[res2.data.team.country];
              const flagImg2 = imageMap[res2P2.data.team.country];
              setPlayer1Country(res2.data.team.country);
              setPlayer2Country(res2P2.data.team.country);
              setFlag(flagImg);
              setFlag2(flagImg2);
          
              setBattingStatsArr(res3.data.battingStats);
              setUpBattingStats(1);
              setBattingStatsArr2(res3P3.data.battingStats);
              setUpBattingStats(2);
          
              setBowlingStatsArr(res4.data.bowlingStats);
              setUpBowlingStats(1);
              setBowlingStatsArr2(res4P4.data.bowlingStats);
              setUpBowlingStats(2);
          
              setWktStats(res5.data.wicketStats);
              setWktStats2(res5P5.data.wicketStats);
          
              setFieldingStats(res6.data.fieldingStats);
              setFieldingStats2(res6P6.data.fieldingStats);
          
            } catch (error) {
              console.error('Error fetching player data:', error);
            }
          };

          const setUpBattingStats = (playerNumber) => {
            if (playerNumber === 1) {
            if(battingStatsArr) {
                const batObj = new BatStats();
            let highScore = 0;
            batObj.setInnings(battingStatsArr.length);
            battingStatsArr.map((item, index) => {
                batObj.setRuns(item.runs);
                batObj.setBalls(item.balls);
                batObj.setFours(item.fours);
                batObj.setSixes(item.sixes);
                if(Number(item.runs) >= 50 && Number(item.runs) < 100)
                    batObj.setFifties(1);
                if(Number(item.runs) >= 100)
                    batObj.setHundreds(1);
                if(Number(item.runs) > highScore)
                    highScore = Number(item.runs);
                if(item.how_out === "Not Out" || item.how_out === "NOT OUT")
                    batObj.setNotOut(1);
                if(item.how_out === "Caught Out")
                    batObj.setCaughtOut(1);
                if(item.how_out === "Run Out" || item.how_out === "Run out")
                    batObj.setRunOut(1);
                if(item.how_out === "Bowled")
                    batObj.setBowled(1);
                if(item.how_out === "LBW")
                    batObj.setLbw(1);
                if(item.how_out === "Stumped")
                    batObj.setStumped(1);
                if(item.how_out !== "Not Out" || item.how_out !== "NOT OUT")
                    batObj.setOut(1);
                //MAN OF THE MATCH HERE
                if(item.wasMom === "Yes")
                    batObj.setMom(1);
            });
            batObj.setHighestScore(highScore);
            setBattingStats(batObj);
            }
            } else {
                if(battingStatsArr2) {
                    const batObj = new BatStats();
                let highScore = 0;
                batObj.setInnings(battingStatsArr2.length);
                battingStatsArr2.map((item, index) => {
                    batObj.setRuns(item.runs);
                    batObj.setBalls(item.balls);
                    batObj.setFours(item.fours);
                    batObj.setSixes(item.sixes);
                    if(Number(item.runs) >= 50 && Number(item.runs) < 100)
                        batObj.setFifties(1);
                    if(Number(item.runs) >= 100)
                        batObj.setHundreds(1);
                    if(Number(item.runs) > highScore)
                        highScore = Number(item.runs);
                    if(item.how_out === "Not Out" || item.how_out === "NOT OUT")
                        batObj.setNotOut(1);
                    if(item.how_out === "Caught Out")
                        batObj.setCaughtOut(1);
                    if(item.how_out === "Run Out" || item.how_out === "Run out")
                        batObj.setRunOut(1);
                    if(item.how_out === "Bowled")
                        batObj.setBowled(1);
                    if(item.how_out === "LBW")
                        batObj.setLbw(1);
                    if(item.how_out === "Stumped")
                        batObj.setStumped(1);
                    if(item.how_out !== "Not Out" || item.how_out !== "NOT OUT")
                        batObj.setOut(1);
                    //MAN OF THE MATCH HERE
                    if(item.wasMom === "Yes")
                        batObj.setMom(1);
                });
                batObj.setHighestScore(highScore);
                setBattingStats2(batObj);
                }
            }
        }
    
        const setUpBowlingStats = (playerNumber) => {
            if (playerNumber === 1) {
                if(bowlingStatsArr) {
                    const bowlObj = new BowlStats();
                    let bestFigWkts = 0, bestFigRuns = 0, hauls = 0;
        
                    bowlObj.setInnings(bowlingStatsArr.length);
                    bowlingStatsArr.map((item, index) => {
                        bowlObj.setRunsConceded(item.runs);
                        bowlObj.setOversBowled(item.overs);
                        bowlObj.setWickets(item.wickets);
                        if(item.wickets > 2)
                            hauls++;
                        //lbw, bowled, catchout, stumpout
                        if (item.wickets > bestFigWkts || (item.wickets === bestFigWkts && item.runs < bestFigRuns)) {
                            bestFigWkts = item.wickets;
                            bestFigRuns = item.runs;
                          }
                    });
                    bowlObj.setBestFigures(`${bestFigWkts}-${bestFigRuns}`);
                    bowlObj.setthreeWicketHauls(hauls);
                    setBowlingStats(bowlObj);
                }
            } else {
                if(bowlingStatsArr2) {
                    const bowlObj = new BowlStats();
                    let bestFigWkts = 0, bestFigRuns = 0, hauls = 0;
        
                    bowlObj.setInnings(bowlingStatsArr2.length);
                    bowlingStatsArr2.map((item, index) => {
                        bowlObj.setRunsConceded(item.runs);
                        bowlObj.setOversBowled(item.overs);
                        bowlObj.setWickets(item.wickets);
                        if(item.wickets > 2)
                            hauls++;
                        //lbw, bowled, catchout, stumpout
                        if (item.wickets > bestFigWkts || (item.wickets === bestFigWkts && item.runs < bestFigRuns)) {
                            bestFigWkts = item.wickets;
                            bestFigRuns = item.runs;
                          }
                    });
                    bowlObj.setBestFigures(`${bestFigWkts}-${bestFigRuns}`);
                    bowlObj.setthreeWicketHauls(hauls);
                    setBowlingStats2(bowlObj);
                }
            }
        }

        fetchPlayerData();
    }, [battingStats, bowlingStats, battingStatsArr, bowlingStatsArr, wktStats, fieldingStats]);

    return (
        <>
        {player && battingStats && bowlingStats && fieldingStats &&
            <div>
                <div className="playerData">
                    <div className="player1Data">
                        <h1 className="teamsHeading"><span className="h1Word1">Player</span> 1</h1>
                        <img className="flagImages" src={flag} alt={player1Country} />
                        <h1 className="playerName">{player.name}</h1>
                    </div>
                    <div className="player2Data">  
                        <h1 className="teamsHeading"><span className="h1Word1">Player</span> 2</h1>
                        <img className="flagImages" src={flag2} alt={player2Country} />
                        <h1 className="playerName">{player2.name}</h1>
                    </div>
                </div>
                <div class="playerStats">
                    <h1 className="playerStatsHeading">STATS <span>INFO</span></h1>
                    <div class="playerStatsTable">
                        <div class="table-header">
                            <div class="header__item">Player Info</div>
                        </div>
                        <div class="table-content">	
                            <div class="table-row">		
                                <div class="table-data">{player1Country}</div>
                                <div class="table-data dataAttribute">Country</div>
                                <div class="table-data">{player2Country}</div>
                            </div>
                            <div class="table-row">		
                                <div class="table-data">{dob}</div>
                                <div class="table-data dataAttribute">DOB</div>
                                <div class="table-data">{dob2}</div>
                            </div>
                            <div class="table-row">		
                                <div class="table-data">{player.role}</div>
                                <div class="table-data dataAttribute">Role</div>
                                <div class="table-data">{player2.role}</div>
                            </div>
                            <div class="table-row">		
                                <div class="table-data">{player.battingstyle}</div>
                                <div class="table-data dataAttribute">Batting Style</div>
                                <div class="table-data">{player2.battingstyle}</div>
                            </div>
                            <div class="table-row">		
                                <div class="table-data">{player.bowlingstyle}</div>
                                <div class="table-data dataAttribute">Bowling Style</div>
                                <div class="table-data">{player2.bowlingstyle}</div>
                            </div>
                        </div>
                        <div class="table-header">
                            <div class="header__item">Batting Stats</div>
                        </div>
                        <div class="table-content">	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getInnings()}</div>
                                <div class="table-data dataAttribute">Innings</div>
                                <div class="table-data">{battingStats2.getInnings()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getRuns()}</div>
                                <div class="table-data dataAttribute">Runs</div>
                                <div class="table-data">{battingStats2.getRuns()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getFours()}</div>
                                <div class="table-data dataAttribute">Fours</div>
                                <div class="table-data">{battingStats2.getFours()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getSixes()}</div>
                                <div class="table-data dataAttribute">Sixes</div>
                                <div class="table-data">{battingStats2.getSixes()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getAverage()}</div>
                                <div class="table-data dataAttribute">Average</div>
                                <div class="table-data">{battingStats2.getAverage()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getStrikeRate()}</div>
                                <div class="table-data dataAttribute">Strike Rate</div>
                                <div class="table-data">{battingStats2.getStrikeRate()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getFifties()}</div>
                                <div class="table-data dataAttribute">Fifties</div>
                                <div class="table-data">{battingStats2.getFifties()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getHundreds()}</div>
                                <div class="table-data dataAttribute">Hundreds</div>
                                <div class="table-data">{battingStats2.getHundreds()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getHighestScore()}</div>
                                <div class="table-data dataAttribute">Highest Score</div>
                                <div class="table-data">{battingStats2.getHighestScore()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{battingStats.getNotOut()}</div>
                                <div class="table-data dataAttribute">Not Out</div>
                                <div class="table-data">{battingStats2.getNotOut()}</div>
                            </div>
                        </div>
                        <div class="table-header">
                            <div class="header__item">Bowling Stats</div>
                        </div>
                        <div class="table-content">	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getInnings()}</div>
                                <div class="table-data dataAttribute">Innings</div>
                                <div class="table-data">{bowlingStats2.getInnings()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getWickets()}</div>
                                <div class="table-data dataAttribute">Wickets</div>
                                <div class="table-data">{bowlingStats2.getWickets()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getOversBowled()}</div>
                                <div class="table-data dataAttribute">Overs Bowled</div>
                                <div class="table-data">{bowlingStats2.getOversBowled()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getRunsConceded()}</div>
                                <div class="table-data dataAttribute">Runs Conceded</div>
                                <div class="table-data">{bowlingStats2.getRunsConceded()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getBestFigures()}</div>
                                <div class="table-data dataAttribute">Best Figures</div>
                                <div class="table-data">{bowlingStats2.getBestFigures()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getEconomy()}</div>
                                <div class="table-data dataAttribute">Economy</div>
                                <div class="table-data">{bowlingStats2.getEconomy()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getAverage()}</div>
                                <div class="table-data dataAttribute">Average</div>
                                <div class="table-data">{bowlingStats2.getAverage()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getStrikeRate()}</div>
                                <div class="table-data dataAttribute">Strike Rate</div>
                                <div class="table-data">{bowlingStats2.getStrikeRate()}</div>
                            </div>	
                            <div class="table-row">		
                                <div class="table-data">{bowlingStats.getThreeWicketHauls()}</div>
                                <div class="table-data dataAttribute">3 Wicket Hauls</div>
                                <div class="table-data">{bowlingStats2.getThreeWicketHauls()}</div>
                            </div>
                        </div>
                        <div class="table-header">
                            <div class="header__item">Fielding Stats</div>
                        </div>
                        <div class="table-content">	
                            <div class="table-row">		
                                <div class="table-data">{fieldingStats.caughtCount}</div>
                                <div class="table-data dataAttribute">Catches</div>
                                <div class="table-data">{fieldingStats2.caughtCount}</div>
                            </div>
                            <div class="table-row">		
                                <div class="table-data">{fieldingStats.stumpedCount}</div>
                                <div class="table-data dataAttribute">Stumpings</div>
                                <div class="table-data">{fieldingStats2.stumpedCount}</div>
                            </div>
                            <div class="table-row">		
                                <div class="table-data">{fieldingStats.runOutCount}</div>
                                <div class="table-data dataAttribute">Run Out</div>
                                <div class="table-data">{fieldingStats2.runOutCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default PlayerData;