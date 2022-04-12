import React from 'react';
import logo from './logo.svg';
import './App.scss';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/custom.css";
import 'react-notifications/lib/notifications.css';
import store, { history } from './components/store';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Newad from './components/pages/insert/Newad';
import Login from './components/Login';


function App(props) {
  return (
    <>
      {props.children}
    </>
  );
}

export default App;
