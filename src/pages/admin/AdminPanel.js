import React, { useEffect, useState } from "react";
import "./admin.css";
import Logo from "../../assets/images/logo.png";
import DataGrid from "./components/DataGrid";
import DataForm from "./components/DataForm";

function AdminPanel() {

    const teamList = ['country', 'captain'];
    const playerList = ['Name', 'DOB', 'Role', 'Batting Style', 'Bowling Style'];
    const matchList = ['Result', 'Venue', 'F-Total', 'F-Extras', 'F-Overs', 'S-Total', 'S-Extras', 'S-Overs', 
                        'Date', 'Link', 'Category', 'Winner', 'Group'];
    const battingStatsList = ['Name','Runs', 'Balls', '4s', '6s', 'Caught-By', 'Wicket-By', 'HowOut', 
                            'Innings', 'WasMOM', 'Position'];
    const bowlingStatsList = ['Name', 'Wickets', 'Runs', 'Overs', 'Innings'];

    const dataFormMatchList = ['Team A', 'Team B', 'Result', 'Venue', 'F-Total', 'F-Extras', 'F-Overs',
                             'S-Total', 'S-Extras', 'S-Overs', 'Date', 'Link', 'Category', 'Winner', 'Group', 'Match Number'];
    const dataFormBattingStatsList = ['Name','Runs', 'Balls', '4s', '6s', 'Caught-By', 'Wicket-By', 'HowOut', 
                            'Innings', 'WasMOM', 'Match Number', 'Position'];
    const dataFormBowlingStatsList = ['Name', 'Wickets', 'Runs', 'Overs', 'Match Number', 'Innings'];

    const playerAttributes = ['name', 'dob', 'role', 'battingstyle', 'bowlingstyle'];
    const matchesAttributes = ['firstTeam_name', 'secondTeam_name' ,'result', 'venue' ,'f_total', 'f_extras', 'f_overs', 's_total',
                                's_extras', 's_overs', 'date', 'highlights', 'category', 'winner', 'group', 'match_number'];
    const battingStatsAttributes = ['player_name', 'runs', 'balls', 'fours', 'sixes', 'caught_by', 'wicket_by', 'how_out', 
                                    'innings', 'wasMom', 'match_number', 'playing_position'];
    const bowlingStatsAttributes = ['player_name', 'wickets', 'runs', 'overs', 'match_number', 'innings'];

    const [activeList, setActiveList] = useState(teamList);
    const [checkOption, setCheckOption] = useState(true);
    const [activeOption, updateActiveOption] = useState("teams");
    const [attributes, setAttributes] = useState(teamList);
    const [dataFormActiveList, setDataFormActiveList] = useState(teamList);

    return (
       <div className="adminPanelPage">
        <h1 className="adminPanelHeading"><span>Hey</span> Folks!</h1>
            <div className="adminPanelData">
                <div className="sideBar">
                    <img src={Logo} />
                    <h4 onClick={(e) => 
                        {setActiveList(teamList); updateActiveOption("teams");
                        setAttributes(teamList); setDataFormActiveList(teamList);}}>Team Stats</h4>
                    <h4  onClick={(e) => 
                        {setActiveList(playerList); updateActiveOption("players");
                        setAttributes(playerAttributes); setDataFormActiveList(playerList);}}>Player Stats</h4>
                    <h4  onClick={(e) => 
                        {setActiveList(matchList); updateActiveOption("matches");
                        setAttributes(matchesAttributes); setDataFormActiveList(dataFormMatchList);}}>Match Stats</h4>
                    <h4  onClick={(e) => 
                        {setActiveList(battingStatsList); updateActiveOption("battingStats");
                        setAttributes(battingStatsAttributes); setDataFormActiveList(dataFormBattingStatsList);}}>Batting Stats</h4>
                    <h4  onClick={(e) => 
                        {setActiveList(bowlingStatsList); updateActiveOption("bowlingStats");
                        setAttributes(bowlingStatsAttributes); setDataFormActiveList(dataFormBowlingStatsList);}}>Bowling Stats</h4>
                </div>
                <div className="dataSection">
                    {checkOption ? 
                    <div className="dataGrid">
                        <DataGrid list={activeList} activeOption={activeOption} />
                        <span className="btnSpan">
                            <button className="addDataButton" onClick={(e) => setCheckOption(!checkOption)}> ADD DATA </button>
                        </span>
                    </div> : 
                    <div className="section2">
                        <h1><span>Enter</span> Data</h1>
                        <hr />
                        <DataForm list={dataFormActiveList} attributes={attributes} 
                        setCheckOperator={setCheckOption} checkOperator={checkOption} activeOption={activeOption}/>
                    </div>
                    }
                </div>
            </div>
       </div>
    );
}

export default AdminPanel;