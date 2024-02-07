import React from 'react';

function BattingCardEntry(props) {
    let howOutString, sr = props.sr;
    const setupHowOut = () => {
        if(props.howOut == "Caught Out")
            howOutString = `c ${props.caughtBy} b ${props.wicketBy}`;
        else if(props.howOut == "Run Out" || props.howOut == "Run out")
            howOutString = `run out (${props.wicketBy})`;
        else if(props.howOut == "Bowled")
            howOutString = `b ${props.wicketBy}`;
        else if(props.howOut == "Not Out" || props.howOut == "NOT OUT")
            howOutString = `not out`;
        else if(props.howOut == "LBW")
            howOutString = `lbw b ${props.wicketBy}`;
        else if(props.howOut == "Stumped")
            howOutString = `st ${props.caughtBy} b ${props.wicketBy}`;
        else if(props.howOut == "Hit Wicket")
            howOutString = `hit wicket`;
        else if(props.howOut == "Retired Hurt")
            howOutString = `retired hurt`;
        

        if(props.sr == "NaN")
            sr = "0";
    }

    setupHowOut();

    return (
        <>
            <tr aria-rowspan={2}>
                <td className="batter">{props.batter}<br/><span className="howOutRow">{howOutString}</span></td>
                <td>{props.runs}</td>
                <td>{props.balls}</td>
                <td>{props.fours}</td>
                <td>{props.sixes}</td>
                <td>{sr}</td>
            </tr>
        </>
    );
}

export default BattingCardEntry;