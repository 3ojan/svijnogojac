import { USER_LOGIN_SUCCESS, AUTH_FAILED, USER_LOGOUT_SUCCESS, SET_USERS } from '../actions/userAction'

// email: "test@test.hr"
// firstName: "test"
// iat: 1647942565
// lastName: "user"
// role: 1
// _id: "62390c0905eb689c461bfd99"

const initialState = {
  loading: true,
  userData: null,
  // token: localStorage.getItem("svinje-token"),
  token: null,
  users: null,
}
let names = {};
let users = [];

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
    case SET_USERS:
      users = action.payload.users;
      return {
        ...state,
        users: action.payload.users,
        loading: false
      }
    default: return state
  }
}

export const getUserFullName = (id) => {
  if (names[id]) {
    return names[id];
  }
  const item = users.filter(item => item._id === id);
  if (item[0]) {
    names[id] = `${item[0].firstName} ${item[0].lastName}`
  }
  return names[id];
}

export default userReducer