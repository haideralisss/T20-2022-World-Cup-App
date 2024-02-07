import { React , useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function HighestRuns() {
    
    const [highestRuns, setHighestRuns] = useState(null);
    const imageMap = useContext(ImageContext);
    
    useEffect(() => {
        const fetchHighestScoreList = async () => {
            const result = await axios.get("/battingStats/balls/player");
            setHighestRuns(result.data._highestScoreList);
        }
        fetchHighestScoreList();
    }, []);
    
    return (
        <>
            {highestRuns && 
                highestRuns.map((item, index) => 
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.player_name}</td>
                        <td><img className='teamsImg' src={imageMap[item.country]} />{item.country}</td>
                        <td>{item.highestRuns}</td>
                        <td>{isFinite(parseInt(item.totalRuns, 10) / parseInt(item.totalOut, 10))
                                ? (parseInt(item.totalRuns, 10) / parseInt(item.totalOut, 10)).toFixed(2)
                                : "-"}</td>
                        <td>{item.isNotOut ? item.highestRuns : "-"}</td>
                        <td>{item.highestRuns}</td>
                    </tr>
                )
            }
        </>
    );
}

export default HighestRuns;