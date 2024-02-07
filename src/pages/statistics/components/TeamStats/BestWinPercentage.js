import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function BestWinPercentage() {

    const [bestWinPercentage, setbestWinPercentage] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchbestWinPercentage () {
            const bestWinPercentage = await axios.get("/teams/country/bestWinPercentage");
            bestWinPercentage.data._teamStats.sort((a, b) => b.bestWinPercentage - a.bestWinPercentage);
            setbestWinPercentage(bestWinPercentage.data._teamStats);
        }
        fetchbestWinPercentage();
    }, []);

    return(
        <>
            {bestWinPercentage && 
                bestWinPercentage.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td><span><img className='teamsImg'  src={imageMap[data.country]} /></span>{data.country}</td>
                        <td>{data.bestWinPercentage}</td>
                        <td>{data.totalMatches}</td>
                        <td>{data.totalWins}</td>
                        <td>{data.totalLosses}</td>
                        <td>-</td>
                    </tr>
                
            )}
        </>
    );
}

export default BestWinPercentage;