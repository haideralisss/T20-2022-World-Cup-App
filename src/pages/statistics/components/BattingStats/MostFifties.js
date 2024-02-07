import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function MostFifties() {
    const [mostFifties, setmostFifties] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchmostFifties () {
            const result = await axios.get("/battingStats/runs/MostRuns");
            console.log(result);
            result.data.runsData.sort((a, b) => b.totalFifties - a.totalFifties);
            setmostFifties(result.data.runsData);
        }
        fetchmostFifties();
    }, []);

    return(
        <>
            {mostFifties && 
                mostFifties.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.totalFifties}</td>
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

export default MostFifties;