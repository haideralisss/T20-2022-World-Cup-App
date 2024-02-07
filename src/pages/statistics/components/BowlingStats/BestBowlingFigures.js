import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestBowlingFigures() {

    const [bestBowlingFigures, setbestBowlingFigures] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestBowlingFigures () {
            const bestBowlingFigures = await axios.get("/bowlingStats/balls/bestBowlingFigures");
            bestBowlingFigures.data.bowlingData.sort((a, b) => {
                if (a.bestFigWkts !== b.bestFigWkts) {
                  return b.bestFigWkts - a.bestFigWkts;
                } else {
                  return b.bestFigRuns - a.bestFigRuns;
                }
              });
            setbestBowlingFigures(bestBowlingFigures.data.bowlingData);
        }
        fetchbestBowlingFigures();
    }, []);

    return(
        <>
            {bestBowlingFigures && 
                bestBowlingFigures.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.bestBowlingFigures}</td>
                        <td>-</td>
                        <td>{data.totalWickets}</td>
                        <td>{data.totalRuns}</td>
                    </tr>
                
            )}
        </>
    );
}

export default BestBowlingFigures;