import axios from "axios";
import { baseUrl } from "./userAction";
import { NotificationContainer, NotificationManager } from 'react-notifications';

export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ADS_SUCCESS = 'GET_ADS_SUCCESS';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_AD_BY_ID_SUCCESS = 'GET_AD_BY_ID_SUCCESS';




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
          NotificationManager.success("Artikal unesen");
          console.log("success")

        } else {
          NotificationManager.error("Greška u spremanju artikla!");
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
    axios.post(`${baseUrl}/articles`)
      .then(res => {
        if (res.data.success === true) {
          NotificationManager.success("Artikli učitani");
          dispatch({
            type: GET_ARTICLES_SUCCESS,
            payload: res.data
          });

        } else {
          NotificationManager.error("Greška u dohvaćanju artikla!");
        }
      })
  } catch (e) {

  }
};

export const storeNewItem = (item, cb) => async dispatch => {
  try {
    axios.post(`${baseUrl}/newad`, item)
      .then(res => {
        if (res.data.success === true) {
          NotificationManager.success("Spremljeno", "Novi oglas");
          cb && cb();
          // dispatch({
          //   type: USER_LOGIN_SUCCESS,
          //   payload: res.data
          // });
          // localStorage.setItem('token', res.data.token);

        }
        if (res.data.success === false) {
          NotificationManager.error("Sva polja moraju biti popunjena osim napomene", "Novi oglas");

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

export const editExistingAd = (item, callback) => async dispatch => {
  try {
    if (item.status) {
      item.adStatus = item.status;
    }
    axios.post(`${baseUrl}/updateAds`, item)
      .then(res => {
        callback && callback();
        if (res.data.success === true) {
          NotificationManager.success("Oglas spremljen", "Editiranje");
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

export const getAdById = (id, callback) => async dispatch => {
  try {
    axios.get(`${baseUrl}/ads/${id}`)
      .then(res => {
        if (res.data.success === true) {
          NotificationManager.success("Oglas učitan");
          callback(res.data.result)
          dispatch({
            type: GET_AD_BY_ID_SUCCESS,
            payload: res.data.result
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

export const getAdds = () => async dispatch => {
  try {
    axios.get(`${baseUrl}/ads`)
      .then(res => {
        if (res.data.success === true) {
          NotificationManager.success("Oglasi učitani");
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
          NotificationManager.success("Kategorije učitane");
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
          NotificationManager.success("Kategorija spremljena");
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

export const getAdsByArticleId = (id, callback) => async dispatch => {
  axios.get(`${baseUrl}/getarticleads/${id}`)
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
export const updateArticle = (id, params, callback) => async dispatch => {
  axios.post(`${baseUrl}/updatearticle/${id}`, params)
    .then(res => {
      if (res.data.success === true) {
        NotificationManager.success("Artikal uređen");
        callback(res.data.ads)
      } else {
        console.log(res)
      }
    },
      error => {
        // console.error('onRejected function called: ' + error.message);
      })
};
export const deleteArticle = (id, callback) => async dispatch => {
  axios.get(`${baseUrl}/deletearticle/${id}`)
    .then(res => {
      if (res.data.success === true) {
        NotificationManager.success("Artikal obrisan");
        callback(res.data.ads)
      } else {
        console.log(res)
      }
    },
      error => {
        // console.error('onRejected function called: ' + error.message);
      })
};
export const getArticleById = (id, callback) => async dispatch => {
  axios.get(`${baseUrl}/articles/${id}`)
    .then(res => {
      if (res.data.success === true) {
        NotificationManager.success("Artikal učitan");
        callback(res.data.ads)
      } else {
        console.log(res)
      }
    },
      error => {
        // console.error('onRejected function called: ' + error.message);
      })
};