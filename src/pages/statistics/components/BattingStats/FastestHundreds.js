import { React , useContext, useEffect, useState } from "react";
import axios from "axios";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function FastestHundreds() {
    
    const [fastestHundreds, setfastestHundreds] = useState(null);
    let serialNumber = 0;
    const imageMap = useContext(ImageContext);
    
    useEffect(() => {
        const fetchFastestHundredsList = async () => {
            const result = await axios.get("/battingStats/balls/player");
            setfastestHundreds(result.data._highestScoreList);
        }
        fetchFastestHundredsList();
    }, []);
    
    return (
        <>
            {fastestHundreds && 
                fastestHundreds.map((item, index) => 
                    <tr>
                        <td>{++serialNumber}</td>
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

export default FastestHundreds;