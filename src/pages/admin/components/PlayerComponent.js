import { React, useState } from "react";

function PlayerComponent({updateOption, index, item, rowSerialNumber, handleInput, convertStringToDate, updateData, deleteData}) {

    const [playerForm, setPlayerForm] = useState({
        name: item.name,
        dob: convertStringToDate(item.dob),
        role: item.role,
        battingstyle: item.battingstyle,
        bowlingstyle: item.bowlingstyle
    });

    const handlePlayerInputChange = (e) => {
        setPlayerForm({
            ...playerForm,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <div className="admin-table-data">
                {rowSerialNumber}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.name :
                <input className="dataGridInputs" type="text" name="name"
                value={playerForm.name} onChange={handlePlayerInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.dob :
                <input className="dataGridInputs" type="text" name="dob"
                value={playerForm.dob} onChange={handlePlayerInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.role:
                <input className="dataGridInputs" type="text" name="role"
                value={playerForm.role} onChange={handlePlayerInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.battingstyle :
                <input className="dataGridInputs" type="text" name="battingstyle"
                value={playerForm.battingstyle} onChange={handlePlayerInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.bowlingstyle :
                <input className="dataGridInputs" type="text" name="bowlingstyle"
                value={playerForm.bowlingstyle} onChange={handlePlayerInputChange} />}
            </div>
            <div className="admin-table-data">
            <span className="fa fa-pencil icon1" onClick={() => 
                    {updateOption[index] ? handleInput(index) : updateData(index, playerForm); handleInput(index)}} />
                <span className="fa fa-trash-o icon2" onClick={() => deleteData(index)} />
            </div>
        </>
    );
}

export default PlayerComponent;