import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from "history";

import rootReducer from './reducers'

const initalState = {

}

const middleware = [thunk]

export const history = createBrowserHistory();
const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;