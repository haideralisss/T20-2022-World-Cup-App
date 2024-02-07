import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './assets/utils/utils.css';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Teams from './pages/teams/Teams';
import TeamDetails from './pages/teams/TeamDetails';
import Matches from './pages/matches/Matches';
import MatchDetails from './pages/matches/MatchDetails';
import Statistics from './pages/statistics/Statistics';
import PointsTable from './pages/pointsTable/PointsTable';
import Admin from './pages/admin/Admin';
import PlayerStats from './pages/statistics/PlayerStats';
import logo from './assets/images/logo.png';
import ComparePlayers from './pages/compareplayers/ComparePlayers';
import AdminPanel from './pages/admin/AdminPanel';
import { ImageProvider } from './assets/utils/ImageContext';

function App() {
  return (
    <ImageProvider>
    <div className="App">
      <header>
        <div className="logo flex-all-center">
          <img src={logo} alt="T20 World Cup Logo" />
        </div>
        <nav>
            <ul>
                <li><Link to="/" className="nav-item"><div>Home</div></Link></li>
                <li><Link to="/teams" className="nav-item"><div>Teams</div></Link></li>
                <li><Link to="/matches" className="nav-item"><div>Matches</div></Link></li>
                <li><Link to="/statistics" className="nav-item"><div>Statistics</div></Link></li>
                <li><Link to="/pointstable" className="nav-item"><div>Points Table</div></Link></li>
                <li><Link to="/admin" className="nav-item"><div>Admin</div></Link></li>
            </ul> 
        </nav>
      </header>
      <div class="page flex-all-center">
        <Routes> 
          <Route path="/" element={<Home />}></Route>
          <Route path="/teams" element={<Teams />}></Route>
          <Route path="/matches" element={<Matches />}></Route>
          <Route path="/matches/:data" element={<Matches />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route path="/pointstable" element={<PointsTable />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/matchdetails" element={<MatchDetails />}></Route>
          <Route path="/teamdetails" element={<TeamDetails />}></Route>
          <Route path="/teamdetails/:data" element={<TeamDetails />}></Route>
          <Route path="/playerstats/:data" element={<PlayerStats />}></Route>
          <Route path="/matchdetails/:data" element={<MatchDetails />}></Route>
          <Route path="/playerstats" element={<PlayerStats />}></Route>
          <Route path='/compareplayers' element={<ComparePlayers />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
        </Routes>
      </div>
      <footer className="flex-all-center">
        <p>
          Copyright &copy; International Cricket Council
        </p>
      </footer>
    </div>
    </ImageProvider>
  );
}

export default App;