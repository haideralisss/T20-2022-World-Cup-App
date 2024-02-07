import {React, useState} from "react";
import axios from "axios";

function DataForm(props) {

    const [formData, setFormData] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`/${props.activeOption}`, formData);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="dataForm">
             {props.list.map((listItem, index) => 
                <div class="inputFieldsContainer" key={listItem}>
                    <input type="text" required="required" name={props.attributes[index]} onChange={handleInputChange} />
                    <label>{listItem}</label>
                    <i></i>
                </div>
         )}
         <span className="dataFormBtns">
                <button type="submit" className="addDataButton" onClick={handleSubmit}>SUBMIT</button>
                <button className="addDataButton" onClick={(e) => props.setCheckOperator(!props.checkOperator)}> BACK </button>
        </span>
        </div>
    );
}

export default DataForm;