import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ImageContext } from '../../assets/utils/ImageContext';
import './teamDetails.css';
import PlayerCard from './components/PlayerCard';

function TeamDetails() {
  const { data } = useParams();
  const [dataList, setDataList] = useState(null);
  const [team, setTeam] = useState(null);
  const [winsCount, setWins] = useState(null);
  const [lossesCount, setLosses] = useState(null);
  const imageMap = useContext(ImageContext);

  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const res = await axios.get(`/players/team/${data}`);
        
        res.data.player.sort((a, b) => {
          const roleOrder = {
            'Batter': 0,
            'Wicket-keeper': 1,
            'All-rounder': 2,
            'Bowler': 3,
          };
        
          const nameComparison = a.name.localeCompare(b.name);
          const roleComparison = roleOrder[a.role] - roleOrder[b.role];
        
          if (roleComparison === 0) {
            return nameComparison;
          } else {
            return roleComparison;
          }
        });
        setDataList(res.data.player);


        const res2 = await axios.get(`/teams/${data}`);
        setTeam(res2.data.team);
        const res3 = await axios.get(`/matches/teamStats/${res2.data.team.country}/wins`);
        setWins(res3.data.wins);
        const res4 = await axios.get(`/matches/teamStats/${data}/${res2.data.team.country}/losses`);
        setLosses(res4.data.losses);
        

      } catch (error) {
        console.error('Error fetching players data:', error);
      }
    };

    fetchPlayersData();
  }, [data]);

  const imgC = imageMap[team && team.country];

  return (
    <>
    <div className="TeamDetails">
      {dataList && (
        <>
      <div className="teamBox">
        <div className="countryDiv">
          <p className="countryH">Team</p>
          <p className="countryN">{team && team.country}</p>
        </div>
        <div className="flagDiv">
          <img className="sumFlag" src={imgC} alt="Flag" />
        </div>
        <div className="countryPairDiv">
          <p className="countryH">Captain</p>
          <p className="otherCountryText">{team && team.captain}</p>
        </div>
        <div className="countryPairDiv flex-col-center">
          <p className="countryH">Wins</p>
          <p className="otherCountryText">{winsCount && winsCount}</p>
        </div>
        <div className="countryPairDiv flex-col-center">
          <p className="countryH">Losses</p>
          <p className="otherCountryText">{lossesCount && lossesCount}</p>
        </div>
      </div>
      <div className="playersCont">
        <p className="playersHeading">Players</p>
        {dataList &&
          dataList.map((item, index) => {
            return <PlayerCard name={item.name} role={item.role} key={index} id={item._id} />;
          })}
      </div>
      </>)}
    </div>
    </>
  );
}

export default TeamDetails;
