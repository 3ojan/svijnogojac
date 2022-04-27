import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const wpUrl = "http://localhost:8666";
export const GET_USERS = 'GET_USERS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const SET_USERS = 'SET_USERS';
export const USERS_ERROR = 'USERS_ERROR';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const baseUrl = "/";


const registerUserData = {
  email: "test@test.hr",
  password: "1234",
  firstName: "test",
  lastName: "user"
}


let token = localStorage.getItem("svinje-token");

export const login = (data, callback) => async dispatch => {
  if (token) {
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    axios.post(`${baseUrl}/login`, data)
      .then(res => {
        if (res.data.success === true) {
          if (res.data.token) {
            NotificationManager.success("Korsnik ulogiran");
            token = res.data.token;
            localStorage.setItem("svinje-token", token);
            axios.defaults.headers.common = {
              'Authorization': `Bearer ${res.data.token}`
            }
          }
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
          });
          callback && callback();
          // localStorage.setItem('token', res.data.token);

        }
        if (res.data.success === false) {
          NotificationManager.error(res.data.message);
        }
        else {
        }
      })
  } catch (e) {
    dispatch({
      type: USERS_ERROR,
      payload: console.log(e)
    });
  }
};

export const auth = () => async dispatch => {
  axios.defaults.headers.common = {
    'Authorization': `Bearer ${token}`
  }
  axios.get(`${baseUrl}/auth`)
    .then(res => {
      if (res.data.success === true) {
        NotificationManager.success("Autorizacija uspješna!");
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data
        });
      } else {
        console.log(res)
        NotificationManager.error("Greška u autoriziranju korisnika!");
      }
    },
      error => {
        dispatch({
          type: AUTH_FAILED,
        });
        // console.error('onRejected function called: ' + error.message);
      })
};

export const logout = (callback) => async dispatch => {
  if (token) {
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${token}`
    }
  }
  axios.get(`${baseUrl}/logout`)
    .then(res => {
      if (res.data.success === true) {
        localStorage.removeItem("svinje-token");
        token = null;
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          payload: res.data
        });
        NotificationManager.success("Odjava uspješna!");
        callback && callback();
      } else {
        console.log(res)

      }
    },
      error => {
        dispatch({
          type: AUTH_FAILED,
        });
      })
};


export const getUsers = () => async dispatch => {
  axios.get(`${baseUrl}/users`)
    .then(res => {
      if (res.data.success === true) {
        NotificationManager.success("Korisnici učitani!");
        dispatch({
          type: SET_USERS,
          payload: res.data
        });
      } else {
        console.log(res)

      }
    },
      error => {
        dispatch({
          type: "USERS_GET_FAILED",
        });
        // console.error('onRejected function called: ' + error.message);
      })
};
export const getUserAds = (id, callback) => async dispatch => {
  axios.get(`${baseUrl}/getownerads/${id}`)
    .then(res => {
      if (res.data.success === true) {
        NotificationManager.success("Oglasi učitani!");
        callback(res.data.ads)
      } else {
        console.log(res)

      }
    },
      error => {
        // console.error('onRejected function called: ' + error.message);
      })
};