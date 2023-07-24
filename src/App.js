import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import About from './pages/About';
import PeriodCal from './pages/PeriodCal';
import Header from './components/Header';
import Footer from './components/Footer';
import Terminology from './components/Terminology';
import Conception from './components/Conception';
import MorningSickness from './components/MorningSickness';
import MealPlanner from './components/MealPlanner';
import MenstrualCycle from './components/MenstrualCycle';
import BreastFeeding from './components/BreastFeeding';
import HivTips from './components/HivTips';
import ShareCall from './components/ShareCall';
import Home from './pages/Home';
import Immunization from './pages/Immunization';
import TermsAndPolicy from './pages/TermsAndPolicy';
import Settings from './pages/Settings';
import Pregnancy from './components/Pregnancy';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/periodcal" element={<PeriodCal />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
          <Route path="/terminology" element={<Terminology />} />
          <Route path="/conception" element={<Conception />} />
          <Route path="/morningSickness" element={<MorningSickness />} />
          <Route path="/mealplanner" element={<MealPlanner />} />
          <Route path="/BreastFeeding" element={<BreastFeeding />} />
          <Route path="/menstrualcycle" element={<MenstrualCycle />} />
          <Route path="/hivtips" element={<HivTips />} />
          <Route path="/immunization" element={<Immunization />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/termsandpolicy" element={<TermsAndPolicy />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
