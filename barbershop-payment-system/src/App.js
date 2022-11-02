import './styles/App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import {SignIn} from './pages/AdminLogin';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';
import HairStyles from './pages/HairStyles';
import HairPricing from './pages/HairPricing';


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/appointments">
              <Appointments />
            </Route>
            <Route path="/AdminLogin">
              <SignIn/>
            </Route>
            <Route path="/hairstyles">
              <HairStyles/>
            </Route>
            <Route path="/HairPricing">
              <HairPricing/>
            </Route>
            <PrivateRoute path="/Admin">
              <Admin/>
            </PrivateRoute>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
