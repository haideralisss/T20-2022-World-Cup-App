import React, { useState } from "react";

function BowlingStatsComponent({updateOption, item, index, rowSerialNumber, handleInput, updateData, deleteData}) {

    const [bowlingStatsForm, setBowlingStatsForm] = useState({
        player_id: item.player_id,
        match_id: item.match_id,
        player_name: item.player_name,
        wickets: item.wickets,
        runs: item.runs,
        overs: item.overs,
        innings: item.innings 
    });

    const handleBowlingStatsInputChange = (e) => {
        setBowlingStatsForm({
            ...bowlingStatsForm,
            [e.target.name] : e.target.value
        });
    }

    return (
        <>
            <div className="admin-table-data">
                {rowSerialNumber}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.player_name :
                <input className="dataGridInputs" type="text" name="player_name"
                value={bowlingStatsForm.player_name} onChange={handleBowlingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.wickets :
                <input className="dataGridInputs" type="text" name="wickets"
                value={bowlingStatsForm.wickets} onChange={handleBowlingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.runs :
                <input className="dataGridInputs" type="text" name="runs"
                value={bowlingStatsForm.runs} onChange={handleBowlingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.overs :
                <input className="dataGridInputs" type="text" name="overs"
                value={bowlingStatsForm.overs} onChange={handleBowlingStatsInputChange} />}
            </div>	
            <div className="admin-table-data">
                {updateOption[index] ? item.innings :
                <input className="dataGridInputs" type="text" name="innings"
                value={bowlingStatsForm.innings} onChange={handleBowlingStatsInputChange} />}
            </div>
            <div className="admin-table-data">
                <span className="fa fa-pencil icon1" onClick={(e) =>
                {updateOption[index] ? handleInput(index) : updateData(index, bowlingStatsForm); handleInput(index)}} />
                <span className="fa fa-trash-o icon2" onClick={() => deleteData(index)} />
            </div>
        </>
    );
}

export default BowlingStatsComponent;