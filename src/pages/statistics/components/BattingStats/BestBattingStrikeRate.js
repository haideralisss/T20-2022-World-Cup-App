import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestBattingStrikeRate() {

    const [bestBattingStrikeRate, setbestBattingStrikeRate] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestBattingStrikeRate () {
            const bestBattingStrikeRate = await axios.get("/battingStats/runs/MostRuns");
            bestBattingStrikeRate.data.runsData.sort((a, b) => b.strikeRate - a.strikeRate);
            setbestBattingStrikeRate(bestBattingStrikeRate.data.runsData);
        }
        fetchbestBattingStrikeRate();
    }, []);

    return(
        <>
            {bestBattingStrikeRate && 
                bestBattingStrikeRate.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{(data.strikeRate).toFixed(2)}</td>
                        <td>{data.totalInnings}</td>
                        <td>{isFinite(parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10))
                                ? (parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10)).toFixed(2)
                                : "-"}</td>
                        <td>{data.totalRuns}</td>
                    </tr>
                
            )}
        </>
    );
}

export default BestBattingStrikeRate;