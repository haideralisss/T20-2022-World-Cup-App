import React from "react";

function PlayerStatsRow(props) {
    return(
        <>
        <div className="playerDetailsBox">
                <img className="countryF" src={props.flag} alt="Flag"/>
                <div className="flex-col-center">
                    <div className="countryH">
                        Player Name
                    </div>
                    <div>
                        <p className="playerFullName"><span className="playerFName">{props.fName}</span> {props.lName}</p>
                    </div>
                </div>
                <div className="emptyBox">

                </div>
                <div className="flex-col-center playerDetailSeparator">
                    <div>
                        <div className="countryH">
                            DOB
                        </div>
                        <div>
                            <p>{props.dob}</p>
                        </div>
                    </div>
                    <div>
                        <div className="countryH">
                            Role
                        </div>
                        <div>
                            <p>{props.role}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-col-center playerDetailSeparator">
                    <div>
                        {props.isBatter ? (
                            <>
                                <div className="countryH">
                                    Batting Style
                                </div>
                                <div>
                                    <p>{props.battingstyle}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="countryH">
                                    Bowling Style
                                </div>
                                <div>
                                    <p>{props.bowlingstyle}</p>
                                </div>
                            </>
                        )
                        }
                    </div>
                    <div>
                        <div className="countryH">
                            MoM Awards
                        </div>
                        <div>
                            <p>{props.wasMom}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayerStatsRow;