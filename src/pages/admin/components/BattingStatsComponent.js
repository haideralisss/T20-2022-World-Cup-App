import React, { useState } from "react";

function BattingStatsComponent({updateOption, item, index, rowSerialNumber, handleInput, updateData, deleteData}) {

    const [battingStatsForm, setBattingStatsForm] = useState({
        player_id: item.player_id,
        match_id: item.match_id,
        player_name: item.player_name,
        runs: item.runs,
        balls: item.balls,
        fours: item.fours,
        sixes: item.sixes,
        caught_by: item.caught_by,
        wicket_by: item.wicket_by,
        how_out: item.how_out,
        innings: item.innings,
        wasMom: item.wasMom,
        playing_position: item.playing_position
    });

    const handleBattingStatsInputChange = (e) => {
        setBattingStatsForm({
            ...battingStatsForm,
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
                value={battingStatsForm.player_name} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.runs :
                <input className="dataGridInputs" type="text" name="runs"
                value={battingStatsForm.runs} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.balls :
                <input className="dataGridInputs" type="text" name="balls"
                value={battingStatsForm.balls} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.fours :
                <input className="dataGridInputs" type="text" name="fours"
                value={battingStatsForm.fours} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.sixes :
                <input className="dataGridInputs" type="text" name="sixes"
                value={battingStatsForm.sixes} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.caught_by :
                <input className="dataGridInputs" type="text" name="caught_by"
                value={battingStatsForm.caught_by} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.wicket_by :
                <input className="dataGridInputs" type="text" name="wicket_by"
                value={battingStatsForm.wicket_by} onChange={handleBattingStatsInputChange} />}
            </div>
            <div className="admin-table-data">
                {updateOption[index] ? item.how_out :
                <input className="dataGridInputs" type="text" name="how_out"
                value={battingStatsForm.how_out} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.innings :
                <input className="dataGridInputs" type="text" name="innings"
                value={battingStatsForm.innings} onChange={handleBattingStatsInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.wasMom :
                <input className="dataGridInputs" type="text" name="wasMom"
                value={battingStatsForm.wasMom} onChange={handleBattingStatsInputChange} />}
            </div>	
            <div className="admin-table-data">
                {updateOption[index] ? item.playing_position :
                <input className="dataGridInputs" type="text" name="playing_position"
                value={battingStatsForm.playing_position} onChange={handleBattingStatsInputChange} />}
            </div>
            <div className="admin-table-data">
                <span className="fa fa-pencil icon1" onClick={(e) => 
                {updateOption[index] ? handleInput(index) : updateData(index, battingStatsForm); handleInput(index)}} />
                <span className="fa fa-trash-o icon2" onClick={() => deleteData(index)} />
            </div>
        </>
    );
}

export default BattingStatsComponent;