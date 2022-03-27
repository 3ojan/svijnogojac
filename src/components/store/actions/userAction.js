import axios from "axios";
const wpUrl = "http://localhost:8666";

export const GET_USERS = 'GET_USERS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const SET_USERS = 'SET_USERS';
export const USERS_ERROR = 'USERS_ERROR';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

const baseUrl = "http://localhost:2999";
const registerUserData = {
  email: "test@test.hr",
  password: "1234",
  firstName: "test",
  lastName: "user"
}
const newItem = {
  article: "article",
  owner: "bojan",
  entryDate: new Date(),
  origin: "EU",
  wantedPrice: "100",
  finishDate: new Date(),
  comment: "comment",
}
let token = localStorage.getItem("svinje-token");

export const login = () => async dispatch => {
  if (token) {
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    axios.post(`${baseUrl}/login`, registerUserData)
      .then(res => {
        if (res.data.success === true) {
          if (res.data.token) {
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
          // localStorage.setItem('token', res.data.token);

        } else {
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
        console.log(res.data)
      } else {
        console.log(res)

      }
    },
      error => {
        dispatch({
          type: AUTH_FAILED,
        });
        // console.error('onRejected function called: ' + error.message);
      })
};


export const storeNewItem = () => async dispatch => {
  try {
    axios.post(`${baseUrl}/newad`, newItem)
      .then(res => {
        if (res.data.success === true) {
          // dispatch({
          //   type: USER_LOGIN_SUCCESS,
          //   payload: res.data
          // });
          // localStorage.setItem('token', res.data.token);

        } else {
        }
      })
  } catch (e) {
    // dispatch({
    //   type: USERS_ERROR,
    //   payload: console.log(e)
    // });
  }
};
export const storeArticle = () => async dispatch => {
  try {
    axios.post(`${baseUrl}/newArticle`, { name: "kukuruz" })
      .then(res => {
        if (res.data.success === true) {
          // dispatch({
          //   type: USER_LOGIN_SUCCESS,
          //   payload: res.data
          // });
          // localStorage.setItem('token', res.data.token);

        } else {
        }
      })
  } catch (e) {
    // dispatch({
    //   type: USERS_ERROR,
    //   payload: console.log(e)
    // });
  }
};