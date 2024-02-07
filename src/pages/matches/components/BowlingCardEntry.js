import React from 'react';

function BowlingCardEntry(props) {
    return (
        <tr>
            <td className="bowler">{props.bowler}</td>
            <td>{props.overs}</td>
            <td>{props.runs}</td>
            <td>{props.wickets}</td>
            <td>{props.eco}</td>
        </tr>
    );
}

export default BowlingCardEntry;