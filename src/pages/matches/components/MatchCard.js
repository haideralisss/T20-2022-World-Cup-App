import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ImageContext } from '../../../assets/utils/ImageContext';

function MatchCard(props) {
  const [teamNames, setTeamNames] = useState(null);
  const imageMap = useContext(ImageContext);

  const url = `/matchdetails/${encodeURIComponent(props.matchid)}`;

  useEffect(() => {
    const fetchTeamNames = async () => {
        try {
          const [res1, res2] = await Promise.all([
            axios.get(`/teams/${props.teamA}`),
            axios.get(`/teams/${props.teamB}`),
          ]);
      
          let teamNamesObj = {
            fTeamName: res1.data.team.country,
            sTeamName: res2.data.team.country,
          };
      
          setTeamNames(teamNamesObj);
        } catch (error) {
          console.error('Error fetching team names');
        }
      }

    fetchTeamNames();
  }, [props.teamA, props.teamB]);

  const imgA = imageMap[teamNames && teamNames.fTeamName];
  const imgB = imageMap[teamNames && teamNames.sTeamName];

    return (
        <Link to={url} class="matchLink">
            {teamNames &&  
            <div class="matchCard">
                <div className="result">
                    {props.result}
                </div>
                <div className="matchCardRow">
                    <div className="matchNo">
                        {props.matchType}<br />
                        T20 {props.matchNo} of 45
                    </div>
                    <div className="teamsColumn">
                        <div className="teamDetails">
                            <img className="flag" src={imgA} alt="Flag"/>
                            <p>{teamNames && teamNames.fTeamName}</p>
                        </div>
                        <div className="gap">

                        </div>
                        <div className="teamDetails">
                            <img className="flag" src={imgB} alt="Flag"/>
                            <p>{teamNames && teamNames.sTeamName}</p>
                        </div>
                    </div>
                    <div className="scoresColumn">
                        <div className="scoreDetails">
                            <p>{props.teamAscore}</p>
                            <p className="ov">Ov: {props.teamAovers}</p>
                        </div>
                        <div className="gap">

                        </div>
                        <div className="scoreDetails">
                            <p>{props.teamBscore}</p>
                            <p className="ov">Ov: {props.teamBovers}</p>
                        </div>
                    </div>
                    <div className="datePlace">
                        <p className="date">{props.date}</p>
                        <p className="ven">{props.venue}</p>
                    </div>
                </div>
            </div>
            }
        </Link>
    )
}

export default MatchCard;