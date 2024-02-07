import React from 'react';
import './teams.css';
import '../../assets/utils/utils.css';
import CountryCard from './components/CountryCard';
import axios from "axios";
import {useState} from "react";
import { Routes, Route, Link } from 'react-router-dom';

function Teams() {

    const [dataList, setData] = useState(null);

    const fetchTeamData = async () => {
        const res = await axios.get("/teams");
        res.data.team.sort((a, b) => a.country.localeCompare(b.country));
        setData(res.data.team);
    }

    fetchTeamData();

    return (
        <div className="Teams flex-all-center">
            <div className="countries">
                {dataList && dataList.map((item, index) => {
                    return (
                        <CountryCard country={item.country} teamID={item._id}/>
                    );
                })}
            </div>
        </div>
    );
}

export default Teams;