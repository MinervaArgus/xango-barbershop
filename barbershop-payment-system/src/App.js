import './styles/App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import AdminLogon from './pages/AdminLogin';

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
              <AdminLogon/>
            </Route>

          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
