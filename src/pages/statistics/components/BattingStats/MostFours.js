import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function MostFours() {
    const [mostFours, setMostFours] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchMostFours () {
            const result = await axios.get("/battingStats/runs/MostRuns");
            result.data.runsData.sort((a, b) => b.totalFours - a.totalFours);
            setMostFours(result.data.runsData);
        }
        fetchMostFours();
    }, []);

    return(
        <>
            {mostFours && 
                mostFours.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.totalFours}</td>
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

export default MostFours;