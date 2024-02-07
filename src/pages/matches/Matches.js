import React from 'react';
import './matches.css';
import MatchCard from './components/MatchCard';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";

function Matches() {
    const { data } = useParams();
    const [venue, setVenue] = useState("All");
    const [dataList, setData] = useState(null);

    const fetchMatchesData = async () => {
        const res = await axios.get("/matches");
        res.data.match.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(res.data.match);
        setVenue(decodeURIComponent(data));
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchMatchesData();
    }, [data]);

    return (
        <div className="Matches">
            {dataList && dataList.map((item, index) => {
                    let formattedDate = new Date(item.date).toLocaleDateString();
                    if (item.venue === venue || decodeURIComponent(data) === "undefined")
                        return (
                            <MatchCard matchid={item._id} result={item.result} matchType={item.category} matchNo={index+1} teamA={item.f_id} teamB={item.s_id} teamAscore={item.f_total} teamBscore={item.s_total} teamAovers={item.f_overs} teamBovers={item.s_overs} date={formattedDate} venue={item.venue} />
                        );
            })}
        </div>
    );
}

export default Matches;