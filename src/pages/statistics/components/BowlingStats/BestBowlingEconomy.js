import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestBowlingEconomy() {

    const [bestBowlingEconomy, setbestBowlingEconomy] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestBowlingEconomy () {
            const bestBowlingEconomy = await axios.get("/bowlingStats/balls/bestBowlingEconomy");
            bestBowlingEconomy.data.bowlingData.sort((a, b) => a.bestBowlingEconomy - b.bestBowlingEconomy);
            setbestBowlingEconomy(bestBowlingEconomy.data.bowlingData);
        }
        fetchbestBowlingEconomy();
    }, []);

    return(
        <>
            {bestBowlingEconomy && 
                bestBowlingEconomy.map((data, index) => {
                    if (data.bestBowlingEconomy !== 0) {
                        return (
                            <tr>
                                <td>{++serialNumber}</td>
                                <td>{data.player_name}</td>
                                <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                                <td>{data.bestBowlingEconomy.toFixed(2)}</td>
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

export default BestBowlingEconomy;