import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestBowlingStrikeRate() {

    const [bestBowlingStrikeRate, setbestBowlingStrikeRate] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestBowlingStrikeRate () {
            const bestBowlingStrikeRate = await axios.get("/bowlingStats/balls/BestBowlingStrikeRate");
            bestBowlingStrikeRate.data.bowlingData.sort((a, b) => a.bestBowlingStrikeRate - b.bestBowlingStrikeRate);
            setbestBowlingStrikeRate(bestBowlingStrikeRate.data.bowlingData);
        }
        fetchbestBowlingStrikeRate();
    }, []);

    return(
        <>
            {bestBowlingStrikeRate && 
                bestBowlingStrikeRate.map((data, index) => {
                    if (data.bestBowlingStrikeRate !== 0) {
                        return (
                            <tr>
                                <td>{++serialNumber}</td>
                                <td>{data.player_name}</td>
                                <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                                <td>{data.bestBowlingStrikeRate.toFixed(2)}</td>
                                <td>-</td>
                                <td>{data.totalWickets}</td>
                                <td>{data.totalRuns}</td>
                            </tr>
                        )
                    }
                }
                
            )}
        </>
    );
}

export default BestBowlingStrikeRate;