import { Link } from 'react-router-dom';
import { ImageContext } from '../../../assets/utils/ImageContext';
import React, { useContext } from 'react';

function CountryCard(props) {

    const imageMap = useContext(ImageContext);
    const imgC = imageMap[props.country];

    const url = `/teamdetails/${encodeURIComponent(props.teamID)}`;

    return (
        <Link to={url} className="teamLink">
            <div className="country">
                <img className="img-content" src={imgC} alt="Flag Image"/>
                <p className="countryName">
                    {props.country}
                </p>
            </div>
        </Link>
    );
  }
  
  export default CountryCard;