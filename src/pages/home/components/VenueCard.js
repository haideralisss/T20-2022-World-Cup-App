import React from "react";
import '../home.css';

function VenueCard(props) {
  return (
    <div className="card-container">
      <div className="card">
        <img className="img-content" src={props.img} alt="Stadium Image"/>
        <div className="content">
          <p className="heading">
            {props.title}
          </p>
          <p>
            {props.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VenueCard;