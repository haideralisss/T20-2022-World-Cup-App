import React from "react";
import cardBg from "../../../assets/images/bg/score.png";

function UpperStatsCard(props) {
    return (
        <>
        <div className="statsCard">
                    <h2 className='h1Text'>{props.title}</h2>
                    <div className="card2">
                        <div className='card2Data'>
                            <span className='playerNameCard'>
                                <span className='playerFirstName'>{props.playerFirstName}</span>
                                <span className='playerLastName'>{props.playerLastName}</span>
                            </span>
                            <div className='playerNationalityCard'>
                                <img className='flagImg' src={props.flag} />
                                <span className='flagName'>{props.team}</span>
                            </div>
                            <div className='runs'>{props.data}</div>
                        </div>
                        <div className='statsImgDiv'>
                            <img src={cardBg} className='cardBg'/>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default UpperStatsCard;