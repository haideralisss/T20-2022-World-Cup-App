import { React, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function MostSixes() {
    const [mostSixes, setmostSixes] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchmostSixes () {
            const result = await axios.get("/battingStats/runs/MostRuns");
            result.data.runsData.sort((a, b) => b.totalSixes - a.totalSixes);
            setmostSixes(result.data.runsData);
        }
        fetchmostSixes();
    }, []);

    return(
        <>
            {mostSixes && 
                mostSixes.map((data, index) => {
                    return(
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.totalSixes}</td>
                        <td>{data.totalInnings}</td>
                        <td>{isFinite(parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10))
                                ? (parseInt(data.totalRuns, 10) / parseInt(data.totalOut, 10)).toFixed(2)
                                : "-"}</td>
                        <td>{data.totalRuns}</td>
                </tr>
                
                )})}
        </>
    );
}

export default MostSixes;