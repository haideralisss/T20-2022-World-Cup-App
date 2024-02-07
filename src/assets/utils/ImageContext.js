import React, { createContext, useState } from 'react';
import pakistan from '../images/flags/pakistan.jpg';
import nz from '../images/flags/nz.png';
import england from '../images/flags/england.jpg';
import australia from '../images/flags/australia.jpg';
import afg from '../images/flags/afghanistan.png';
import india from '../images/flags/india.jpg';
import srilanka from '../images/flags/srilanka.jpg';
import zim from '../images/flags/zim.png';
import scotland from '../images/flags/scotland.png';
import uae from '../images/flags/uae.png';
import ireland from '../images/flags/ireland.jpg';
import ban from '../images/flags/bangladesh.jpg';
import namibia from '../images/flags/namibia.jpg';
import southafrica from '../images/flags/southafrica.jpg';
import ned from '../images/flags/netherlands.png';
import westindies from '../images/flags/westindies.png';

// Create the context
export const ImageContext = createContext();

// Create the provider
export const ImageProvider = ({ children }) => {
  const [imageMap, setImageMap] = useState({
    'Pakistan': pakistan,
    'New Zealand': nz,
    'England': england,
    'Australia': australia,
    'Afghanistan': afg,
    'India': india,
    'Sri Lanka': srilanka,
    'Zimbabwe': zim,
    'Scotland': scotland,
    'UAE': uae,
    'Ireland': ireland,
    'Bangladesh': ban,
    'Namibia': namibia,
    'South Africa': southafrica,
    'West Indies': westindies,
    'Netherlands': ned,
  });

  return (
    <ImageContext.Provider value={imageMap}>
      {children}
    </ImageContext.Provider>
  );
};