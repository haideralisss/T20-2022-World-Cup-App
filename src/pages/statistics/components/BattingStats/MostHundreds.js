import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function MostHundreds() {
    const [mostHundreds, setmostHundreds] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchmostHundreds () {
            const result = await axios.get("/battingStats/runs/MostRuns");
            console.log(result);
            result.data.runsData.sort((a, b) => b.totalHundreds - a.totalHundreds);
            setmostHundreds(result.data.runsData);
        }
        fetchmostHundreds();
    }, []);

    return(
        <>
            {mostHundreds && 
                mostHundreds.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.totalHundreds}</td>
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

export default MostHundreds;