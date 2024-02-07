import React from "react";
import "./comparePlayers.css";
import { useState, useEffect, useRef, useContext } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Cric from "../../assets/images/animations/cric.json";
import axios from "axios";
import { ImageContext } from '../../assets/utils/ImageContext';
import PlayerData from "./components/PlayerData";

function ComparePlayers() {

    const [team1, setTeam1] = useState(false);
    const [player1, setplayer1] = useState(false);
    const [team2, setTeam2] = useState(false);
    const [player2, setPlayer2] = useState(false);
    const [team1Option, setTeam1Option] = useState("Select Team 1");
    const [player1Option, setPlayer1Option] = useState("Select Player 1");
    const [team2Option, setTeam2Option] = useState("Select Team 2");
    const [player2Option, setPlayer2Option] = useState("Select Player 2");
    const [player1List, setPlayer1List] = useState([]);
    const [player2List, setPlayer2List] = useState([]);
    const [player1Id, setPlayer1Id] = useState(null);
    const [player2Id, setPlayer2Id] = useState(null);

    const teamsList = ['Afghanistan', 'Australia', 'Bangladesh', 'England', 'India', 'Ireland', 'Namibia', 
                        'Netherlands', 'New Zeland', 'Pakistan', 'Scotland', 'South Africa', 'Sri Lanka', 'United Arab Emirates',
                         'West Indies', 'Zimbabwe'];

    const playersList1 = [], playersList2 = [];

    const team1Ref = useRef(null);
    const player1Ref = useRef(null);
    const team2Ref = useRef(null);
    const player2Ref = useRef(null);

    useEffect(() => {
            function handleClickOutside(e) {
                if (team1Ref.current && !team1Ref.current.contains(e.target)) {
                   setTeam1(false);
                }
                if (team2Ref.current && !team2Ref.current.contains(e.target)) {
                    setTeam2(false);
                }
                if (player1Ref.current && !player1Ref.current.contains(e.target)) {
                    setplayer1(false);
                }
                if (player2Ref.current && !player2Ref.current.contains(e.target)) {
                    setPlayer2(false);
                }
            }

            window.addEventListener('click', handleClickOutside);
            return () => {
                window.removeEventListener('click', handleClickOutside);
            }
    }, []);

    const fetchPlayers = async (teamName, option) => {
        const team = await axios.get(`/teams/captain/${teamName}`);
        const res = await axios.get(`/players/team/${team.data.team[0]._id.toString()}`);
      
        const filteredPlayerList = res.data.player.filter((player) => {
          return player.name !== player1Option && player.name !== player2Option;
        });
      
        const updatedPlayerList = filteredPlayerList.map((player) => {
          return { playerName: player.name, playerId: player._id };
        });
      
        if (option === "Team 1") {
          setPlayer1List(updatedPlayerList);
        } else {
          setPlayer2List(updatedPlayerList);
        }
      };
      

    

    return (
        <div className="page comparePlayersPage">
            <div className="comparePlayersHeader">
                <h1>Compare Players</h1>
                <span className="lottie">
                    <Player src={Cric} loop autoplay/>
                </span>
            </div>
            <div className="comparePlayersDropDowns">
            <div className='dropdown' ref={team1Ref}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setTeam1(!team1);
                        if (player1) {
                            setplayer1(!player1)
                        }
                        if (team2) {
                            setTeam2(!team2);
                        }
                        if (player2) {
                            setPlayer2(!player2);
                        }
                    }}>
                        {team1Option}
                        <span className='fa fa-caret-down dropDownIcon'></span>
                    </div>
                    { team1 && (
                    <div className='dropdown-content'>
                        {teamsList.map((teamItem) => 
                            <div className='dropdown-item' onClick={(e) => 
                                {setTeam1Option(teamItem); setTeam1(!team1);
                                fetchPlayers(teamItem, "Team 1");}}>
                                {teamItem}
                            </div>
                        )}
                    </div>
                    )}
                </div>
                <div className='dropdown' ref={player1Ref}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setplayer1(!player1)
                        if (team1) {
                            setTeam1(!team1)
                        }
                        if (team2) {
                            setTeam2(!team2);
                        }
                        if (player2) {
                            setPlayer2(!player2);
                        }
                    }}>
                        {player1Option}
                        <span className='fa fa-caret-down dropDownIcon'></span>
                    </div>
                    { player1 && team1Option !== "Select Team 1" && 
                    <div className='dropdown-content'>
                        {player1List.map((item, index) => 
                            <div className='dropdown-item' onClick={(e) => 
                                {setPlayer1Option(item.playerName); setplayer1(!player1);
                                setPlayer1Id(item.playerId);}}>
                                {item.playerName}
                            </div>
                        )}
                    </div>
                    }
                </div>
                <div className='dropdown' ref={team2Ref}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setTeam2(!team2);
                        if (player1) {
                            setplayer1(!player1)
                        }
                        if (team1) {
                            setTeam1(!team1);
                        }
                        if (player2) {
                            setPlayer2(!player2);
                        }
                    }}>
                        {team2Option}
                        <span className='fa fa-caret-down dropDownIcon'></span>
                    </div>
                    { team2 && (
                    <div className='dropdown-content'>
                        {teamsList.map((teamItem) => 
                            <div className='dropdown-item' onClick={(e) => 
                            {setTeam2Option(teamItem); setTeam2(!team2);
                            fetchPlayers(teamItem, "Team 2");}}>
                                {teamItem}
                            </div>
                        )}
                    </div>
                    )}
                </div>
                <div className='dropdown' ref={player2Ref}>
                    <div className='dropdown-btn' onClick={(e) => {
                        setPlayer2(!player2);
                        if (team1) {
                            setTeam1(!team1)
                        }
                        if (team2) {
                            setTeam2(!team2);
                        }
                        if (player1) {
                            setplayer1(!player1);
                        }
                    }}>
                        {player2Option}
                        <span className='fa fa-caret-down dropDownIcon'></span>
                    </div>
                    { player2 && team2Option !== "Select Team 2" &&
                    <div className='dropdown-content'>
                        {player2List.map((item) => 
                            <div className='dropdown-item' onClick={(e) => 
                                {setPlayer2Option(item.playerName); setPlayer2(!player2);
                                setPlayer2Id(item.playerId)}}>
                                {item.playerName}
                            </div>
                        )}
                    </div>
                    }
                </div>
            </div>
            {player1Id && player2Id &&
                <PlayerData player1Id={player1Id} player2Id={player2Id} />
            }
        </div>
    );
}

export default ComparePlayers;