import './styles/App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import { SignIn } from './pages/AdminLogin';
import Admin from './pages/Admin';
import HairStyles from './pages/HairStyles';
import HairPricing from './pages/StylePricing';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import CheckOut from './pages/CheckOut';
import AppointmentStatus from './pages/AppointmentStatus';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App" style={{ fontFamily: "Roboto Slab" }}>
      <header className="App-header nav-bg">
        <Navbar/>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="home"/>
            </Route>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/appointments">
              <Appointments />
            </Route>
            <Route path="/AdminLogin">
              <SignIn />
            </Route>
            <Route path="/hairstyles">
              <HairStyles />
            </Route>
            <Route path="/Products">
              <Products />
            </Route>
            <Route path="/HairPricing">
              <HairPricing />
            </Route>
            <Route path="/Admin">
              <Admin />
            </Route>
            <Route path="/AboutUs">
              <AboutUs />
            </Route>
            <Route path="/checkOut">
              <CheckOut />
            </Route>
            <Route path="/appointmentStatus">
              <AppointmentStatus />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
