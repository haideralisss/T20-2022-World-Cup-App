import React, { useState, useContext, useEffect } from 'react';
import PtsTableEntry from './PtsTableEntry';
import Table from 'react-bootstrap/Table';
import axios from 'axios';  
import PtTableTeam from '../../../models/PtTableTeam';
import { ImageContext } from '../../../assets/utils/ImageContext';

function PtsTable(props) {

  const [matchesList, setMatchesList] = useState(null);
  const [teamsList, setTeamsList] = useState(null);
  const [ptsTableData, setPtsTableData] = useState(null);
  const imageMap = useContext(ImageContext);

  useEffect(() => {
    const fetchGroup1Teams = async () => {
        const res = await axios.get("/teams");
        setTeamsList(res.data.team);

        const res2 = await axios.get(`/matches/group/${props.title}`);
        console.log(res2.data.match);
        setMatchesList(res2.data.match);
        generatePointsTable();
    }

    const generatePointsTable = async () => {

      const teams = [];

      teamsList && teamsList.map((item, index) => {
        teams[index] = new PtTableTeam();
        teams[index].setCountry(item.country);
        teams[index].setId(item._id);
      });

      teams && teams.map((team, i) => {
        matchesList && matchesList.map((match, j) => {
          if(team.getId() == match.f_id)
          {
            team.setGroup(props.title);
            if(match.winner == team.getCountry())
              team.setWins(1);
            else if (match.winner == "No result")
            {
              team.setNoResults(1);
              return;
            }
            else
              team.setLosses(1);
            
              if (match.winner != "No result")
            {
            team.setRunsConceded(Number(match.s_total.split("/")[0]));
            team.setOversBowled(match.s_overs);  
            team.setRunsFaced(Number(match.f_total.split("/")[0]));
            // oversFaced = match.f_overs;
            team.setOversFaced(match.f_overs);      
            }    
          } 
          else if (team.getId() == match.s_id)
          {
            team.setGroup(props.title);
            if(match.winner == team.getCountry())
              team.setWins(1);
            else if (match.winner == "No result")
            {
              team.setNoResults(1);
              return;
            }
            else
              team.setLosses(1);
              
            if (match.winner != "No result")
            {
              team.setRunsConceded(Number(match.f_total.split("/")[0]));
              team.setOversBowled(match.f_overs);  
              team.setRunsFaced(Number(match.s_total.split("/")[0]));
              team.setOversFaced(match.s_overs);      
            }
          }
        });
      });

      setPtsTableData(teams);
    } 

    fetchGroup1Teams();
  }, [matchesList, teamsList, ptsTableData]);

  let position = 0;
  return (
    <div className="tableCard">  
      <p className="tableTitle">{props.title}</p>
      <Table className="table" hover>
        <title>Group 1</title>
        <thead>
          <tr>
            <th>#</th>
            <th className="teamName">Team</th>
            <th>M</th>
            <th>W</th>
            <th>L</th>
            <th>NRR</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
        {
  ptsTableData &&
  ptsTableData
    .filter((team) => team.getGroup() === props.title) // Filter only the teams from Group 1
    .sort((teamA, teamB) => {
      // Sort based on points and NRR
      const pointsDiff = teamB.generatePoints() - teamA.generatePoints();
      if (pointsDiff !== 0) {
        return pointsDiff; // Sort by points if they are different
      } else {
        // Sort by NRR if points are the same
        return teamB.generateNRR() - teamA.generateNRR();
      }
    })
    .map((team, i) => (
      <PtsTableEntry
        key={i}
        pos={i + 1}
        flag={imageMap[team && team.getCountry()]}
        team={team.getCountry()}
        m={team.getMatches()}
        w={team.getWins()}
        l={team.getLosses()}
        nrr={team.generateNRR()}
        pts={team.generatePoints()}
      />
    ))
}

        </tbody>
      </Table>
    </div>
  );
}

export default PtsTable;