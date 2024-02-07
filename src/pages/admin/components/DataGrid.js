import {React, useEffect, useState} from "react";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import TeamComponent from "./TeamComponent";
import PlayerComponent from "./PlayerComponent";
import MatchComponent from "./MatchComponent";
import BattingStatsComponent from "./BattingStatsComponent"
import BowlingStatsComponent from "./BowlingStatsComponent";

function DataGrid(props) {

    const [updateOption, setUpdateOption] = useState(null);
    const [serialNumber, updateSerialNumber] = useState(1);
    const [dataList, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (props.activeOption === "teams") {
                setData(null);
                setUpdateOption(null);
                const res = await axios.get("/teams");
                setUpdateOption(res.data.team.map(() => true));
                setData(res.data.team);
            }
            if (props.activeOption === "players") {
                setData(null);
                setUpdateOption(null);
                const res = await axios.get("/players");
                setUpdateOption(res.data.player.map(() => true));
                setData(res.data.player);
            }
            if (props.activeOption === "matches") {
                setData(null);
                setUpdateOption(null);
                const res = await axios.get("/matches");
                setUpdateOption(res.data.match.map(() => true));
                setData(res.data.match);
            }
            if (props.activeOption === "battingStats") {
                setData(null);
                setUpdateOption(null);
                const res = await axios.get("/battingStats");
                setUpdateOption(res.data.battingStats.map(() => true));
                setData(res.data.battingStats);
            }
            if (props.activeOption === "bowlingStats") {
                setData(null);
                setUpdateOption(null);
                const res = await axios.get("/bowlingStats");
                setUpdateOption(res.data.bowlingStats.map(() => true));
                setData(res.data.bowlingStats);
            }
        };
        fetchData();
    }, [props.activeOption]);

    const updateData = async (index, newData) => {
        const itemId = dataList[index]._id;
        const res = await axios.put(`/${props.activeOption}/${itemId}`, newData);
        if (props.activeOption === "teams") {
            const updatedItem = res.data.team;
            setData((prevData) => {
                const newDataList = [...prevData];
                newDataList[index] = updatedItem;
                return newDataList;
        });
        } else if (props.activeOption === "players") {
            const updatedItem = res.data.player;
            setData((prevData) => {
                const newDataList = [...prevData];
                newDataList[index] = updatedItem;
                return newDataList;
        });
        } else if (props.activeOption === "matches") {
            const updatedItem = res.data.match;
            setData((prevData) => {
                const newDataList = [...prevData];
                newDataList[index] = updatedItem;
                return newDataList;
        });
        } else if (props.activeOption === "battingStats") {
            const updatedItem = res.data.battingStats;
            setData((prevData) => {
                const newDataList = [...prevData];
                newDataList[index] = updatedItem;
                return newDataList;
        });
        } else if (props.activeOption === "bowlingStats") {
            const updatedItem = res.data.bowlingStats;
            setData((prevData) => {
                const newDataList = [...prevData];
                newDataList[index] = updatedItem;
                return newDataList;
        });
        }
      };

    const deleteData = async (index) => {
        const itemId = dataList[index]._id;
        const res = await axios.delete(`/${props.activeOption}/${itemId}`);
        if (props.activeOption === "teams") {
            setData(res.data.team);
        } else if (props.activeOption === "players") {
            setData(res.data.player);
        } else if (props.activeOption === "matches") {
            setData(res.data.match);
        } else if (props.activeOption === "battingStats") {
            setData(res.data.battingStats);
        } else if (props.activeOption === "bowlingStats") {
            setData(res.data.bowlingStats);
        }
    }

    function handleInput(index) {
        const newUpdate = [...updateOption];
        newUpdate[index] = !newUpdate[index];
        setUpdateOption(newUpdate);
    }

    function convertStringToDate(str) {
        const dateObj = new Date(str);
        return dateObj.toLocaleDateString();
    }

    return (
        <>
        {dataList &&
            <div class="container">

                <div class="adminTable">
                    <div class="admin-table-header">
                        <div class="admin__header__item">SR</div>
                        {props.list.map((listItem) => 
                            <div class="admin__header__item">{listItem}</div>
                        )}
                        <div class="admin__header__item">Operations</div>
                    </div>
                    <div class="admin-table-content">	
                        {dataList.map((item, index) => {
                                const rowSerialNumber = serialNumber + index;
                                return (
                                    <div className="admin-table-row">		
                                        {props.activeOption === "teams" &&
                                        <>
                                            <TeamComponent key={index} updateOption={updateOption}
                                            item={item} index={index} rowSerialNumber={rowSerialNumber}
                                            handleInput={handleInput} updateData={updateData} deleteData={deleteData} />
                                        </>}
                                        {props.activeOption === "players" && 
                                            <>
                                                <PlayerComponent key={index} updateOption={updateOption}
                                                item={item} index={index} rowSerialNumber={rowSerialNumber}
                                                handleInput={handleInput} convertStringToDate={convertStringToDate}
                                                updateData={updateData} deleteData={deleteData} />
                                            </>
                                        }
                                        {props.activeOption === "matches" && 
                                            <>
                                                <MatchComponent key={index} updateOption={updateOption}
                                                item={item} index={index} rowSerialNumber={rowSerialNumber}
                                                handleInput={handleInput} convertStringToDate={convertStringToDate}
                                                updateData={updateData} deleteData={deleteData} />
                                            </>
                                        }{props.activeOption === "battingStats" && 
                                        <>
                                            <BattingStatsComponent key={index} updateOption={updateOption}
                                            item={item} index={index} rowSerialNumber={rowSerialNumber}
                                            handleInput={handleInput} updateData={updateData} deleteData={deleteData} />
                                        </>
                                    }
                                    {props.activeOption === "bowlingStats" && 
                                        <>
                                            <BowlingStatsComponent key={index} updateOption={updateOption}
                                            item={item} index={index} rowSerialNumber={rowSerialNumber}
                                            handleInput={handleInput} updateData={updateData} deleteData={deleteData} />
                                        </>
                                    }
                                    </div>
                                );
                            })}
                    </div>	
                </div>
            </div>
        }
        </>
    );
}

export default DataGrid;