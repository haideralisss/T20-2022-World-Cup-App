import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestBattingStrikeRateInnings() {

    const [bestBattingStrikeRateInnings, setbestBattingStrikeRateInnings] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestBattingStrikeRateInnings () {
            const bestBattingStrikeRateInnings = await axios.get("/battingStats/balls/player");
            bestBattingStrikeRateInnings.data._highestScoreList.sort((a, b) => b.strikeRate - a.strikeRate);
            setbestBattingStrikeRateInnings(bestBattingStrikeRateInnings.data._highestScoreList);
        }
        fetchbestBattingStrikeRateInnings();
    }, []);

    return(
        <>
            {bestBattingStrikeRateInnings && 
                bestBattingStrikeRateInnings.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{(data.strikeRate).toFixed(2)}</td>
                        <td>-</td>
                        <td>{data.highestRuns.toFixed(2)}</td>
                        <td>{data.highestRuns}</td>
                    </tr>
                
            )}
        </>
    );
}

export default BestBattingStrikeRateInnings;