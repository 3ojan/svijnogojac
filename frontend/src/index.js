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
import Newarticle from './components/pages/insert/Newarticle';
import ViewAds from './components/pages/Ads/ViewAds';
import ViewArticles from './components/pages/Articles/ViewArticles';
import NewCategory from './components/pages/insert/NewCategory';
import Editad from './components/pages/Ads/Editad';
import Notifications from './components/notifications/Notifications';

ReactDOM.render(
  <App>
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
          <Route exact path="/newarticle" element={<Newarticle />} />
          <Route exact path="/viewads" element={<ViewAds />} />
          <Route exact path="/viewartciles" element={<ViewArticles />} />
          <Route exact path="/newcategory" element={<NewCategory />} />
          <Route exact path="/viewads/:id" element={<Editad />} />
        </Routes>
      </BrowserRouter>
      <Notifications></Notifications>
    </Provider>
  </App>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
