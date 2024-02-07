import React from 'react';

function PtsTableEntry(props) {
    return (
        <tr>
            <td>{props.pos}</td>
            <td className="teamName"><img className="flag" src={props.flag} alt="Flag"/> {props.team}</td>
            <td>{props.m}</td>
            <td>{props.w}</td>
            <td>{props.l}</td>
            <td>{props.nrr}</td>
            <td>{props.pts}</td>
        </tr>
    );
}

export default PtsTableEntry;