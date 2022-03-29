import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { login, auth } from "./store/actions/userAction"

import axios from "axios"
import { useNavigate } from 'react-router';
function Login(props) {

  const { login } = props;
  const user = useSelector(state => state.users);

  const [inputData, setinputData] = useState({
    email: "",
    password: ""
  });

  const onChangeData = (type, e) => {
    switch (type) {
      case "email":
        setinputData({
          ...{ email: e.target.value }
        })
        break;
      case "password":
        setinputData({
          ...{ password: e.target.value },
        })
        break;
      default:
        break;
    }
  }

  const history = useNavigate();

  useEffect(() => {
    console.log(props);
    props.auth();

    if (user.token) {
      history('/newad');
    }
  }, [user.token]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  };

  const loginValidate = () => {
    const email = validateEmail(inputData.email);
    const password = inputData.password.length < 3;

    !email && console.log("Email must be in format example@domain.com")
    !password && console.log("Password obavezan. Min 4 znaka.")

    return !email && !password;
  };
  const loginHandler = (e) => {
    e.nativeEvent.preventDefault();
    if (loginValidate()) {
      login();
    }
  }
  return (
    <div className="font-sans min-h-screen antialiased bg-gray-900 pt-24 pb-5">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <h1 className="font-bold text-center text-4xl text-yellow-500">Udruga<span className="text-blue-500">Svinjogojac</span></h1>
        <form action="#">
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
            <h1 className="font-bold text-xl text-center">Prijava</h1>
            <div className="flex flex-col space-y-1">
              <input type="text" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Korisničko ime" onChange={(e => { onChangeData("email", e) })} value={inputData.email} defaultValue="" />
            </div>

            <div className="flex flex-col space-y-1">
              <input type="password" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Password" onChange={(e => { onChangeData("password", e) })} value={inputData.password} defaultValue="" />
            </div>

            <div className="relative">
              <input type="checkbox" className="inline-block align-middle" />
              <label className="inline-block align-middle" htmlFor="remember">Upamti me</label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
              <a href="#" className="inline-block text-blue-500 hover:text-blue-800 hover:underline">Forgot your password?</a>
              <button type="submit" className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={loginHandler}>
                Ulaz
              </button>
            </div>
          </div>
        </form>
        <div className="flex justify-center text-gray-500 text-sm">
          <p>&copy;2021. All right reserved.</p>
        </div>
      </div >
    </div >
  );
}
const mapStateToProps = (state) => ({ users: state.users })

export default connect(mapStateToProps, { login, auth })(Login)
