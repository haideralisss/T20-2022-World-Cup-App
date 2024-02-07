import React, { useEffect, useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import './matchDetails.css';
import BowlingCard from './components/BowlingCard';
import BattingCard from './components/BattingCard';
import { ImageContext } from '../../assets/utils/ImageContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MatchDetails() {
    const { data } = useParams();
    const [teamNames, setTeamNames] = useState(null);
    const [ matchData, setMatchData ] = useState(null);
    const [innings, setInnings] = useState(1);
    const imageMap = useContext(ImageContext);

    useEffect(() => {
      const fetchMatchData = async () => {
          const res = await axios.get(`/matches/${decodeURIComponent(data)}`);
          setMatchData(res.data.match);

          const [res1, res2] = await Promise.all([
            axios.get(`/teams/${res.data.match.f_id}`),
            axios.get(`/teams/${res.data.match.s_id}`),
          ]);
          let teamNamesObj = {
            fTeamName: res1.data.team.country,
            sTeamName: res2.data.team.country,
          };
          setTeamNames(teamNamesObj);
        }

      fetchMatchData();
    }, [data]);

    const imgA = imageMap[teamNames && teamNames.fTeamName];
    const imgB = imageMap[teamNames && teamNames.sTeamName];
    const formattedDate = new Date(matchData && matchData.date).toLocaleDateString();

    return (
        <div className="MatchDetails">
            <div className="matchSummaryBox">
                <div className="matchSummary">
                    <img className="sumFlag" src={imgA} alt="Flag"/>
                    <div className="teamDetail">
                        <p className="teamScore">
                            {matchData && matchData.f_total}
                        </p>
                        <p className="teamOvers">
                            {matchData && matchData.f_overs.split('/')[0]} Overs
                        </p>
                    </div>
                    <p className="versus">VS</p>
                    <div className="teamDetail">
                        <p className="teamScore">
                            {matchData && matchData.s_total}
                        </p>
                        <p className="teamOvers">
                            {matchData && matchData.s_overs.split('/')[0]} Overs
                        </p>
                    </div>
                    <img className="sumFlag" src={imgB} alt="Flag"/>
                </div>
                <p className="venueNdate">
                    {matchData && matchData.venue} &bull; {matchData && formattedDate} &bull; Match {matchData && matchData.match_number}
                </p>
                <p className="matchResul">
                    {matchData && matchData.result}
                </p>
            </div>
            {
                matchData && matchData.highlights == "-" ? null : (
                    <ReactPlayer
                className="highlights"
                url={matchData && matchData.highlights}
                width="70vw"
                controls={true}
                playing={false}
            />
                )
            }
            {matchData && matchData.f_total == "-" && matchData.s_total == "-" ? null : (
                <>
                    <div className="scorecardNav">
                <div className={`team1Nav ${innings === 1 ? 'active' : ''}`} onClick={(e) => setInnings(1)}>
                    {teamNames && teamNames.fTeamName}
                </div>
                <div className={`team2Nav ${innings === 2 ? 'active' : ''}`} onClick={(e) => setInnings(2)}>
                    {teamNames && teamNames.sTeamName}
                </div>
            </div>
            <BattingCard 
                matchno={matchData && matchData._id} 
                fTotal={matchData && matchData.f_total.split('/')[0]} 
                fExtras={matchData && matchData.f_extras}
                sTotal={matchData && matchData.s_total.split('/')[0]}
                sExtras={matchData && matchData.s_extras}
                innings={innings}
            />
            <BowlingCard 
                matchno={matchData && matchData._id}
                innings={innings}
            />
                </>
            )}
        </div>
    );
}

export default MatchDetails;