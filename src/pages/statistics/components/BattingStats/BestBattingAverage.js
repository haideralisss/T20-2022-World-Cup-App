import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function BestBattingAverage() {
    const [bestBattingAverage, setbestBattingAverage] = useState(null);
    const imageMap = useContext(ImageContext);
    let serialNumber = 0;

    useEffect(() => {
        async function fetchbestBattingAverage () {
            const result = await axios.get("/battingStats/runs/MostRuns");
            result.data.runsData.sort((a, b) => {
                const battingAverageA = parseInt(a.totalRuns, 10) / parseInt(a.totalOut, 10);
                const battingAverageB = parseInt(b.totalRuns, 10) / parseInt(b.totalOut, 10);
                
                return battingAverageB - battingAverageA;
              });
            setbestBattingAverage(result.data.runsData);
        }
        fetchbestBattingAverage();
    }, []);

    return(
        <>
            {bestBattingAverage && 
                bestBattingAverage.map((data, index) => {
                    if (isFinite(parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10))) {
                         return (
                         <tr>
                            <td>{++serialNumber}</td>
                            <td>{data.player_name}</td>
                            <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                            <td>{isFinite(parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10))
                                ? (parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10)).toFixed(2)
                                : "-"}</td>
                            <td>{data.totalInnings}</td>
                            <td>{isFinite(parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10))
                                ? (parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10)).toFixed(2)
                                : "-"}</td>
                            <td>{data.totalRuns}</td>
                        </tr>)
                    }
                }
            )}
        </>
    );
}

export default BestBattingAverage;