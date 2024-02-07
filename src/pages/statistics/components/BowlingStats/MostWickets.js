import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function MostWickets() {

    const [mostWickets, setmostWickets] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchmostWickets () {
            const mostWickets = await axios.get("/bowlingStats/balls/MostWickets");
            mostWickets.data.bowlingData.sort((a, b) => b.totalWickets - a.totalWickets);
            setmostWickets(mostWickets.data.bowlingData);
        }
        fetchmostWickets();
    }, []);

    return(
        <>
            {mostWickets && 
                mostWickets.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.totalWickets}</td>
                        <td>-</td>
                        <td>{data.totalWickets}</td>
                        <td>{data.totalRuns}</td>
                    </tr>
                
            )}
        </>
    );
}

export default MostWickets;