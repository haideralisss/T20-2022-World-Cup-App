import { React, useState } from "react";

function TeamComponent({ updateOption, item, index, rowSerialNumber, handleInput, updateData, deleteData }) {

    const [teamForm, setTeamFormData] = useState({
        country: item.country,
        captain: item.captain
    });

    const handleTeamInputChange = (e) => {
        setTeamFormData({
            ...teamForm,
            [e.target.name] : e.target.value
        });
    }

    return (
        <>
            <div className="admin-table-data">
                {rowSerialNumber}
            </div>
            <div className="admin-table-data">
                {updateOption[index] ? item.country : 
                <input className="dataGridInputs" type="text" name="country"
                value={teamForm.country} onChange={handleTeamInputChange} />}
            </div>
            <div className="admin-table-data">
                {updateOption[index] ? item.captain : 
                <input className="dataGridInputs" type="text" name="captain"
                value={teamForm.captain} onChange={handleTeamInputChange} />}
            </div>
            <div className="admin-table-data">
                <span className="fa fa-pencil icon1" onClick={() => 
                    {updateOption[index] ? handleInput(index) : updateData(index, teamForm); handleInput(index)}} />
                <span className="fa fa-trash-o icon2" onClick={() => deleteData(index)} />
            </div>
      </>
    );
}

export default TeamComponent;