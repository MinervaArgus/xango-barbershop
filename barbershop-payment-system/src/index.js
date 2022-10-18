import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureStore}>
    <Router>
      <App />
    </Router>
  </Provider>
);
