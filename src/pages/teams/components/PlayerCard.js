import React from 'react';
import { Link } from 'react-router-dom';

function PlayerCard(props) {

    const url = `/playerstats/${encodeURIComponent(props.id)}`;

    return (
        <Link to={url} className="playerLink">
            <div className="playerCard">
                <p>
                    {props.name}
                </p>
                <p>
                    {props.role}
                </p>
            </div>
        </Link>
    );
}

export default PlayerCard;