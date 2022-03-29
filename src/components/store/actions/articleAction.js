import axios from "axios";
import { baseUrl } from "./userAction";

export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ADS_SUCCESS = 'GET_ADS_SUCCESS';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

const newItem = {
  article: "article",
  owner: "bojan",
  entryDate: new Date(),
  origin: "EU",
  wantedPrice: "100",
  finishDate: new Date(),
  comment: "comment",
}

export const storeArticle = (article) => async dispatch => {
  try {
    axios.post(`${baseUrl}/newArticle`, article)
      .then(res => {
        if (res.data.success === true) {
          console.log("success")

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
export const getArticle = () => async dispatch => {
  try {
    axios.get(`${baseUrl}/articles`)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: GET_ARTICLES_SUCCESS,
            payload: res.data
          });

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

export const storeNewItem = (item) => async dispatch => {
  try {
    axios.post(`${baseUrl}/newad`, item)
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

export const getAdds = () => async dispatch => {
  try {
    axios.get(`${baseUrl}/ads`)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: GET_ADS_SUCCESS,
            payload: res.data.ads
          });
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

export const getCategories = () => async dispatch => {
  try {
    axios.get(`${baseUrl}/categories`)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: res.data.categories
          });
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

export const storeCategory = (item) => async dispatch => {
  try {
    axios.post(`${baseUrl}/newcategory`, item)
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