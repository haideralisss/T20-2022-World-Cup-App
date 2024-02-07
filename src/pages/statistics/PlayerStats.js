import React, { useState, useEffect, useContext } from 'react';
import './playerStats.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ImageContext } from '../../assets/utils/ImageContext';
import BatStats from '../../models/BatStats';
import BowlStats from '../../models/BowlStats';
import PlayerStatsRow from './components/PlayerStats/PlayerStatsRow';
import BattingStatsRow from './components/PlayerStats/BattingStatsRow';

function PlayerStats() {

    const { data } = useParams();
    const [player, setPlayer] = useState(null);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [dob, setDOB] = useState('');
    const [flag, setFlag] = useState('#');
    const [isBatter, setIsBatter] = useState(true);
    const [battingStatsArr, setBattingStatsArr] = useState(null);
    const [bowlingStatsArr, setBowlingStatsArr] = useState(null);
    const [battingStats, setBattingStats] = useState(null);
    const [bowlingStats, setBowlingStats] = useState(null);
    const [wktStats, setWktStats] = useState(null);
    const [fieldingStats, setFieldingStats] = useState(null);
    const imageMap = useContext(ImageContext);

    useEffect(() => {
    const fetchPlayerData = async () => {
        try {
          const [res] = await Promise.all([
            axios.get(`/players/${decodeURIComponent(data)}`),
          ]);
      
          setPlayer(res.data.player);
      
          const fullName = res.data.player.name;
          const nameArray = fullName.split(' ');
          setFName(nameArray[0]);
          setLName(nameArray[nameArray.length - 1]);
      
          const formattedDate = new Date(res.data.player.dob).toLocaleDateString();
          setDOB(formattedDate);
      
          if (res.data.player.role === "Bowler")
            setIsBatter(false);
      
          const [res2, res3, res4, res5, res6] = await Promise.all([
            axios.get(`/teams/${res.data.player.teamid}`),
            axios.get(`/battingStats/player/${res.data.player._id}`),
            axios.get(`/bowlingStats/player/${res.data.player._id}`),
            axios.get(`/battingStats/wickets/${res.data.player.name}`),
            axios.get(`/battingStats/fielding/${res.data.player.name}`),
          ]);
      
          const flagImg = imageMap[res2.data.team.country];
          setFlag(flagImg);
      
          setBattingStatsArr(res3.data.battingStats);
          setUpBattingStats();
      
          setBowlingStatsArr(res4.data.bowlingStats);
          setUpBowlingStats();
      
          setWktStats(res5.data.wicketStats);
      
          setFieldingStats(res6.data.fieldingStats);
      
        } catch (error) {
          console.error('Error fetching player data:', error);
        }
      };

    const setUpBattingStats = () => {
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
            if(item.how_out == "Not Out" || item.how_out == "NOT OUT")
                batObj.setNotOut(1);
            if(item.how_out == "Caught Out")
                batObj.setCaughtOut(1);
            if(item.how_out == "Run Out" || item.how_out == "Run out")
                batObj.setRunOut(1);
            if(item.how_out == "Bowled")
                batObj.setBowled(1);
            if(item.how_out == "LBW")
                batObj.setLbw(1);
            if(item.how_out == "Stumped")
                batObj.setStumped(1);
            if(item.how_out != "Not Out" || item.how_out != "NOT OUT")
                batObj.setOut(1);
            //MAN OF THE MATCH HERE
            if(item.wasMom == "Yes")
                batObj.setMom(1);
        });
        batObj.setHighestScore(highScore);
        setBattingStats(batObj);
        }
    }

    const setUpBowlingStats = () => {
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
    }


    fetchPlayerData();
    }, [player, battingStats, bowlingStats, battingStatsArr, bowlingStatsArr, wktStats, fieldingStats]);

    return(
        <>
        {player && battingStats && bowlingStats && fieldingStats &&
        <div className="PlayerStats">
            <PlayerStatsRow flag={flag} fName={fName} lName={lName}
            dob={dob} role={player.role} isBatter={isBatter} battingstyle={player.battingstyle}
            bowlingstyle={player.bowlingstyle} wasMom={battingStats.getMom()} />

            <div className="flex-all-center  statsRoww">
                <BattingStatsRow innings={battingStats.getInnings()} runs={battingStats.getRuns()}
                balls={battingStats.getBalls()} fours={battingStats.getFours()} sixes={battingStats.getSixes()}
                average={battingStats.getAverage()} strikeRate={battingStats.getStrikeRate()} fifties={battingStats.getFifties()}
                hundreds={battingStats.getHundreds()} highestScore={battingStats.getHighestScore()} notOut={battingStats.getNotOut()}
                lbw={battingStats.getLbw()} bowled={battingStats.getBowled()} stumped={battingStats.getStumped()}
                caughtOut={battingStats.getCaughtOut()} runOut={battingStats.getRunOut()} />
                <div className="playerStatistic">
                    <div>
                        <p className="statsType">Bowling <span className="pink-text">Stats</span></p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Innings
                        </p>
                        <p className="statsItself">
                            {bowlingStats.getInnings()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Wickets
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getWickets()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Overs Bowled
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getOversBowled()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Runs Conceded
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getRunsConceded()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Best Figures
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getBestFigures()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Economy
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getEconomy()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Average
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getAverage()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Strike Rate
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getStrikeRate()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            3 Wicket Hauls
                        </p>
                        <p className="statsItself">
                        {bowlingStats.getThreeWicketHauls()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            LBW
                        </p>
                        <p className="statsItself">
                        {wktStats.LBW}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Bowled
                        </p>
                        <p className="statsItself">
                        {wktStats.Bowled}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Catch Out
                        </p>
                        <p className="statsItself">
                        {wktStats.CaughtOut}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Stumped Out
                        </p>
                        <p className="statsItself">
                        {wktStats.Stumped}
                        </p>
                    </div>
                </div>
                <div className="playerStatistic">
                    <div>
                        <p className="statsType">Fielding <span className="pink-text">Stats</span></p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Innings
                        </p>
                        <p className="statsItself">
                            {battingStats.getInnings()}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Catches
                        </p>
                        <p className="statsItself">
                            {fieldingStats.caughtCount}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Stumpings
                        </p>
                        <p className="statsItself">
                            {fieldingStats.stumpedCount}
                        </p>
                    </div>
                    <div className="statPair">
                        <p className="statsLabel">
                            Run Outs
                        </p>
                        <p className="statsItself">
                        {fieldingStats.runOutCount}
                        </p>
                    </div>
                </div>
            </div>
        </div>}
        </>
    );
}

export default PlayerStats;