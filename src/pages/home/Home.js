import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './home.css';
import '../../assets/utils/utils.css';
import VenueCard from './components/VenueCard';
import mcg from '../../assets/images/venues/mcg.jpg';
import scg from '../../assets/images/venues/scg.jpg';
import adelaide from '../../assets/images/venues/adelaide.jpg';
import perth from '../../assets/images/venues/perth.jpg';
import gabba from '../../assets/images/venues/gabba.jpg';
import kardinia from '../../assets/images/venues/kardinia.jpg';
import bellerive from '../../assets/images/venues/bellerive.jpg';

function Home() {
    return (
        <div className="Home flex-all-center">
            <div className="bg-img">
                <div className="landing-text">
                    <h1>
                        Unleash the T20 World Cup 2022 Magic in Australia!
                    </h1>
                    <p>
                        Join us for the most exciting cricket tournament of the year as the top teams from around the world gather in Australia to compete for the T20 World Cup. Get ready to witness thrilling matches, breathtaking sixes, and outstanding displays of skill and sportsmanship.
                    </p>
                </div>
            </div>
            <div class="Venues">
                <h2>Venues</h2>
                <div className="VenuesRow">
                    <Link to="/matches/MCG, Melbourne">
                        <VenueCard title="Melbourne Cricket Ground" img={mcg} desc="Witness cricket history at the iconic Melbourne Cricket Ground."/>
                    </Link>
                    <Link to={`/matches/${encodeURIComponent("SCG, Sydney")}`}>
                        <VenueCard title="Sydney Cricket Ground" img={scg} desc="Immerse yourself in the electric atmosphere of the Sydney Cricket Ground."/>
                    </Link>
                    <Link to={`/matches/${encodeURIComponent("Adelaide Oval, Adelaide")}`}>
                        <VenueCard title="Adelaide Oval" img={adelaide} desc="Feel the passion for cricket at the picturesque Adelaide Oval."/>
                    </Link>
                    <Link to={`/matches/${encodeURIComponent("Perth Stadium, Perth")}`}>
                        <VenueCard title="Perth Stadium" img={perth} desc="Experience cricketing excellence at the state-of-the-art Perth Stadium."/>
                    </Link>
                    <Link to={`/matches/${encodeURIComponent("The Gabba, Brisbane")}`}>
                        <VenueCard title="The Gabba" img={gabba} desc="Roar with excitement at The Gabba Stadium."/>
                        </Link>
                    <Link to={`/matches/${encodeURIComponent("Kardinia Park, Geelong")}`}>
                        <VenueCard title="Kardinia Park" img={kardinia} desc="Experience the thrill at Kardinia Park Stadium."/>
                    </Link>
                    <Link to={`/matches/${encodeURIComponent("Bellerive Oval, Hobart")}`}>
                        <VenueCard title="Bellerive Oval" img={bellerive} desc="Unwind by the riverside at Bellerive Oval."/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;