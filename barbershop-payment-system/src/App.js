import './styles/App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Admin from './pages/Admin';
import Location from './pages/Location'; 

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
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/location"> 
              <Location />
            </Route>

          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
