import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestBowlingAverage() {

    const [bestBowlingAverage, setbestBowlingAverage] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestBowlingAverage () {
            const bestBowlingAverage = await axios.get("/bowlingStats/balls/BestBowlingAverage");
            bestBowlingAverage.data.bowlingData.sort((a, b) => a.bestBowlingAverage - b.bestBowlingAverage);
            setbestBowlingAverage(bestBowlingAverage.data.bowlingData);
        }
        fetchbestBowlingAverage();
    }, []);

    return(
        <>
            {bestBowlingAverage && 
                bestBowlingAverage.map((data, index) => {
                    if (data.bestBowlingAverage !== 0) {
                        return (
                            <tr>
                                <td>{++serialNumber}</td>
                                <td>{data.player_name}</td>
                                <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                                <td>{data.bestBowlingAverage.toFixed(2)}</td>
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

export default BestBowlingAverage;