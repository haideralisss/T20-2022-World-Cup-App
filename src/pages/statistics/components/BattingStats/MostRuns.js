import { React, useContext, useEffect, useState } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';
import axios from "axios";

function Mostruns() {

    const [mostRuns, setMostRuns] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);

    useEffect(() => {
        async function fetchMostRuns () {
            const mostRuns = await axios.get("/battingStats/runs/MostRuns");
            setMostRuns(mostRuns.data.runsData);
        }
        fetchMostRuns();
    }, []);

    return(
        <>
            {mostRuns && 
                mostRuns.map((data, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
                        <td>{data.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[data.country]} />{data.country}</td>
                        <td>{data.totalRuns}</td>
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

export default Mostruns;