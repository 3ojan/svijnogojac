import { combineReducers } from 'redux'
import userReducer from './userReducer'
import articlesReducer from './articleReducer'



export default combineReducers({
  users: userReducer,
  articlesState: articlesReducer,
})