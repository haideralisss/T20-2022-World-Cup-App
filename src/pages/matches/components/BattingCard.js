import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import BattingCardEntry from './BattingCardEntry';
import "../../matches/matchDetails.css";
import axios from 'axios';

function BattingCard(props) {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBattingStats = async () => {
        const res4 = await axios.get(`/battingStats/matches/${props.matchno}`); 
        
        const batStatsArr = res4.data.battingStats;
        batStatsArr.sort((a, b) => a.playing_position - b.playing_position);
        setData(batStatsArr);
    };

    fetchBattingStats();
  }, [data]);


    return (
        <div className="BattingCard">
            <Table id='battingTable'>
          <thead>
            <tr>
              <th className="bowler">Batting</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => {
                    return (
                       item.innings == props.innings ? (
                        item.runs == null ? (
                        <BattingCardEntry
                          batter={item.player_name}
                          runs="-"
                          balls="-"
                          fours="-"
                          sixes="-"
                          sr="-"
                          howOut=""
                          caughtBy=""
                          wicketBy=""
                        />
                      ) : (
                        <BattingCardEntry 
                          batter={item.player_name} 
                          runs={item.runs} 
                          balls={item.balls} 
                          fours={item.fours} 
                          sixes={item.sixes} 
                          sr={((Number(item.runs) / Number(item.balls)) * 100).toFixed(2)} 
                          howOut={item.how_out}
                          caughtBy={item.caught_by}
                          wicketBy={item.wicket_by}
                        />
                      )
            ) : null
                )})}
            <tr className="runsRow">
              <td className="totalRuns">Total Runs</td>
              <td className="cardScore" colSpan={5}>{props.fTotal} ({props.fExtras} extras)</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
}

export default BattingCard;