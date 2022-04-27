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
import Ponuda from './components/pages/Ads/Ponuda';
import Users from './components/pages/Users/Users';
import UserAds from './components/pages/Users/UserAds';
import ArticleAds from './components/pages/Users/ArticleAds';
import Potraznja from './components/pages/Ads/Potraznja';
import Editarticle from './components/pages/insert/Editarticle';

ReactDOM.render(
  <App>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newad" element={<Newad />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newarticle" element={<Newarticle />} />
          <Route path="/viewads" element={<ViewAds />} />
          <Route path="/ponuda" element={<Ponuda />} />
          <Route path="/potraznja" element={<Potraznja />} />
          <Route path="/articleads/:articleId" element={<ArticleAds />} />
          <Route path="/potraznja" element={<ViewAds />} />
          <Route path="/viewarticles" element={<ViewArticles />} />
          <Route path="/newcategory" element={<NewCategory />} />
          <Route path="/viewads/:id" element={<Editad />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userads/:id" element={<UserAds />} />
          <Route path="/editarticle/:id" element={<Editarticle />} />
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
