import './styles/App.css';
import React, { useState } from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import {SignIn} from './pages/AdminLogin';
import Admin from './pages/Admin';


function App() {

  // function requireAuth(nextState, replace, next) {
  //   if (!authenticated) {
  //     replace({
  //       pathname: "/login",
  //       state: {nextPathname: nextState.location.pathname}
  //     });
  //   }
  //   next();
  // }

  const [token, setToken] = useState();
  
  if(!token) {
    return <SignIn setToken={setToken} />
  }


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
              <Route path="/Admin">
                {/*onEnter={requireAuth}*/} 
              <Admin/>
            </Route>

          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
