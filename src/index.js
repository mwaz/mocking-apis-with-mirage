import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import {makeServer} from './server'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'


if (!process.env.REACT_APP_PROXY) {
  makeServer()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

