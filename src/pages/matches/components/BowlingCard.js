import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import "../../matches/matchDetails.css";
import BowlingCardEntry from './BowlingCardEntry';
import axios from 'axios';

function BowlingCard(props) {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBowlingStats = async () => {
        const res4 = await axios.get(`/bowlingStats/matches/bowlingstats/${props.matchno}`); 
        
        // const batStatsArr = res4.data.battingStats;
        // batStatsArr.sort((a, b) => a.playing_position - b.playing_position);
        setData(res4.data.bowlingStats);
    };

    fetchBowlingStats();
  }, [data]);

    return (
      <div className="BowlingCard flex-all-center">
        <Table id='bowlingTable'>
          <thead>
            <tr>
              <th className="bowler">Bowling</th>
              <th>O</th>
              <th>R</th>
              <th>W</th>
              <th>Eco</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => {
                    
                  let eco = 0, balls = 0;

                    if (item.overs.includes('.')) {
                      balls = Number(item.overs.split('.')[1]) / 6;
                      eco = (Number(item.overs.split('.')[0]) + balls).toFixed(2);
                    } else {
                      eco = (Number(item.runs) / Number(item.overs)).toFixed(2);
                    }

                    return (
                  
                       item.innings == props.innings ? (
                          <BowlingCardEntry bowler={item.player_name} overs={item.overs} runs={item.runs} wickets={item.wickets} eco={eco} />
                        ) : null
                )})}
          </tbody>
        </Table>
      </div>
    );
}

export default BowlingCard;