import React from 'react';
import './App.scss';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/custom.css";
import 'react-notifications/lib/notifications.css';


function App(props) {
  return (
    <>
      {props.children}
    </>
  );
}

export default App;
