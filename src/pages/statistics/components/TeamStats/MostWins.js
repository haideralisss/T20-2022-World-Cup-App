import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function MostWins() {

    const [mostWins, setmostWins] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchmostWins () {
            const mostWins = await axios.get("/teams/country/MostWins");
            mostWins.data._teamStats.sort((a, b) => {
                if (a.totalWins !== b.totalWins) {
                    return b.totalWins - a.totalWins;
                } else {
                    if (a.totalMatches !== b.totalMatches) {
                        return a.totalMatches - b.totalMatches;
                    } else {
                        return a.totalLosses - b.totalLosses;
                    }
                }
            });
            setmostWins(mostWins.data._teamStats);
        }
        fetchmostWins();
    }, []);

    return(
        <>
            {mostWins && 
                mostWins.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td><span><img className='teamsImg'  src={imageMap[data.country]} /></span>{data.country}</td>
                        <td>{data.totalWins}</td>
                        <td>{data.totalMatches}</td>
                        <td>{data.totalWins}</td>
                        <td>{data.totalLosses}</td>
                        <td>-</td>
                    </tr>
                
            )}
        </>
    );
}

export default MostWins;