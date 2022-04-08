import { GET_ARTICLES_SUCCESS, GET_ADS_SUCCESS, GET_CATEGORIES_SUCCESS, GET_AD_BY_ID_SUCCESS } from "../actions/articleAction"


const initialState = {
  articles: null,
  loading: true,
  ads: null,
  categories: null,

  editedAd: null,
}

let names = {};
let articles = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      articles = action.payload.articles;
      return {
        ...state,
        articles: action.payload.articles,
        loading: false
      }
    case GET_ADS_SUCCESS:
      return {
        ...state,
        ads: action.payload,
        loading: false
      }
    case GET_AD_BY_ID_SUCCESS:
      return {
        ...state,
        editedAd: action.payload,
        loading: false
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false
      }

    default: return state
  }
}



export const getArticleName = (id) => {
  if (names[id]) {
    return names[id];
  }
  const item = articles.filter(item => item._id === id);
  if (item[0]) {
    names[id] = item[0].name
  }
  return names[id];
}

export default userReducer