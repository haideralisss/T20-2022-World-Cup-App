import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { ImageContext } from '../../../../assets/utils/ImageContext';

function HighestMatchAggregate() {
    
    const imageMap = useContext(ImageContext);
    let serialNumber = 0;
    const [highestAggregate, setHighestAggregate] = useState(null);
    const [venue, setVenue] = useState(null);
    const [date, setDate] = useState(null);
    const [teamA, setTeamA] = useState(null);
    const [teamB, setTeamB] = useState(null);
    useEffect(() => {

        const fetchHighestAggregate = async () => {
            let highestAggregate = 0, teamIndex = 0;
            const matches = await axios.get("/matches");
            matches.data.match.map((match, index) => {
                var totalRuns = parseInt(match.f_total, 10) + parseInt(match.s_total, 10);
                if (totalRuns > highestAggregate) {
                   highestAggregate = totalRuns;
                   teamIndex = index;
                }
            });
            const f_team = await axios.get(`/teams/${matches.data.match[teamIndex].f_id}`);
            const s_team = await axios.get(`/teams/${matches.data.match[teamIndex].s_id}`);
            setHighestAggregate(highestAggregate);
            setVenue(matches.data.match[teamIndex].venue);
            setDate(matches.data.match[teamIndex].date);
            setTeamA(s_team.data.team.country);
            setTeamB(f_team.data.team.country);
        }
        fetchHighestAggregate();

    }, []);

    function convertData(date) {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }

    return (
        <>
            {highestAggregate && venue && date && teamA && teamB &&
                
                    <tr>
                        <td>{++serialNumber}</td>
                        <td><span><img className='teamsImg'  src={imageMap[teamA]} /></span>{teamA}</td>
                        <td>{highestAggregate}</td>
                        <td><span><img className='teamsImg'  src={imageMap[teamB]} /></span>{teamB}</td>
                        <td>{venue}</td>
                        <td>{convertData(date)}</td>
                        <td>{highestAggregate}</td>
                    </tr>
                
            }
        </>
    );
}

export default HighestMatchAggregate;