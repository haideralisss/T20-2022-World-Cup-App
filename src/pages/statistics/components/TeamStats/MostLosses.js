import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function MostLosses() {

    const [mostLosses, setmostLosses] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchmostLosses () {
            const mostLosses = await axios.get("/teams/country/mostLosses");
            mostLosses.data._teamStats.sort((a, b) => {
                if (a.totalLosses !== b.totalLosses) {
                    return b.totalLosses - a.totalLosses;
                } else {
                    if (a.totalMatches !== b.totalMatches) {
                        return b.totalMatches - a.totalMatches;
                    } else {
                        return a.totalWins - b.totalWins;
                    }
                }
            });
            setmostLosses(mostLosses.data._teamStats);
        }
        fetchmostLosses();
    }, []);

    return(
        <>
            {mostLosses && 
                mostLosses.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td><span><img className='teamsImg'  src={imageMap[data.country]} /></span>{data.country}</td>
                        <td>{data.totalLosses}</td>
                        <td>{data.totalMatches}</td>
                        <td>{data.totalWins}</td>
                        <td>{data.totalLosses}</td>
                        <td>-</td>
                    </tr>
                
            )}
        </>
    );
}

export default MostLosses;