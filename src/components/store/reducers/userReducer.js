import { USER_LOGIN_SUCCESS, AUTH_FAILED, USER_LOGOUT_SUCCESS } from '../actions/userAction'

// email: "test@test.hr"
// firstName: "test"
// iat: 1647942565
// lastName: "user"
// role: 1
// _id: "62390c0905eb689c461bfd99"

const initialState = {
  users: [],
  loading: true,
  userData: null,
  // token: localStorage.getItem("svinje-token"),
  token: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload.userData,
        token: action.payload.token,
        loading: false
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...initialState
      }
    case AUTH_FAILED:
      return {
        ...state,
        userData: null,
        token: null,
        loading: false
      }
    default: return state
  }
}

export default userReducer