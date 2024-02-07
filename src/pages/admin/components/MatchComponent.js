import { React, useState } from "react";

function MatchComponent({updateOption, item, index, rowSerialNumber, handleInput, convertStringToDate, updateData, deleteData}) {

    const [matchForm, setMatchForm] = useState({
        f_id: item.f_id,
        s_id: item.s_id,
        result: item.result,
        venue: item.venue,
        f_total: item.f_total,
        f_extras: item.f_extras,
        f_overs: item.f_overs,
        s_total: item.s_total,
        s_extras: item.s_extras,
        s_overs: item.s_overs,
        date: convertStringToDate(item.date),
        highlights: item.highlights,
        category: item.category,
        winner: item.winner,
        group: item.group,
        match_number: item.match_number
    });

    const handleMatchInputChange = (e) => {
        setMatchForm({
            ...matchForm,
            [e.target.name] : e.target.value
        });
    }

    return (
        <>			
            <div className="admin-table-data">
                {rowSerialNumber}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.result :
                <input className="dataGridInputs" type="text" name="result"
                value={matchForm.result} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.venue :
                <input className="dataGridInputs" type="text" name="venue"
                value={matchForm.venue} onChange={handleMatchInputChange} />}
            </div>	
            <div className="admin-table-data">
                {updateOption[index] ? item.f_total :
                <input className="dataGridInputs" type="text" name="f_total"
                value={matchForm.f_total} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.f_extras :
                <input className="dataGridInputs" type="text" name="f_extras"
                value={matchForm.f_extras} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.f_overs :
                <input className="dataGridInputs" type="text" name="f_overs"
                value={matchForm.f_overs} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.s_total :
                <input className="dataGridInputs" type="text" name="s_total"
                value={matchForm.s_total} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.s_extras :
                <input className="dataGridInputs" type="text" name="s_extras"
                value={matchForm.s_extras} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.s_overs :
                <input className="dataGridInputs" type="text" name="s_overs"
                value={matchForm.s_overs} onChange={handleMatchInputChange} />}
            </div>	
            <div className="admin-table-data">
                {updateOption[index] ? convertStringToDate(item.date) :
                <input className="dataGridInputs" type="text" name="date"
                value={matchForm.date} onChange={handleMatchInputChange} />}
            </div>	
            <div className="admin-table-data">
                {updateOption[index] ? item.highlights :
                <input className="dataGridInputs" type="text" name="highlights"
                value={matchForm.highlights} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.category :
                <input className="dataGridInputs" type="text" name="category"
                value={matchForm.category} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.winner :
                <input className="dataGridInputs" type="text" name="winner"
                value={matchForm.winner} onChange={handleMatchInputChange} />}
            </div>		
            <div className="admin-table-data">
                {updateOption[index] ? item.group :
                <input className="dataGridInputs" type="text" name="group"
                value={matchForm.group} onChange={handleMatchInputChange} />}
            </div>	
            <div className="admin-table-data">
                <span className="fa fa-pencil icon1" onClick={(e) => 
                {updateOption[index] ? handleInput(index) : updateData(index, matchForm); handleInput(index)}} />
                <span className="fa fa-trash-o icon2" onClick={() => deleteData(index)} />
            </div>
        </>
    );
}

export default MatchComponent;