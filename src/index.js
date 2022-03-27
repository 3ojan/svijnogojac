import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store, { history } from './components/store';
import Profile from './components/Profile/Profile';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Newad from './components/pages/insert/Newad';
import Login from './components/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Register from './components/Register';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/newad" element={<Newad />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
