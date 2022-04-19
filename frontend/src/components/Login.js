import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { login, auth } from "./store/actions/userAction"

import { useNavigate } from 'react-router';
function Login(props) {

  const { login } = props;
  const history = useNavigate();
  const user = useSelector(state => state.users);

  const [inputData, setinputData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null
  });

  const onChangeData = (type, e) => {
    switch (type) {
      case "email":
        setinputData({
          ...inputData,
          ...{ email: e.target.value }
        })
        break;
      case "password":
        setinputData({
          ...inputData,
          ...{ password: e.target.value },
        })
        break;
      default:
        break;
    }
  }



  useEffect(() => {
    if (user.token) {
      history('/newad');
    }
    else {
      props.auth();
    }
  }, [user.token]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  };

  const loginValidate = () => {
    const email = validateEmail(inputData.email);
    const password = inputData.password && inputData.password.length > 3;

    !email && console.log("Email must be in format example@domain.com")
    !password && console.log("Password obavezan. Min 4 znaka.")
    if (!email && !password) {
      setErrors({ email: !email, password: !password })
      return false;
    }
    return true
  };
  const loginHandler = (e) => {
    e.nativeEvent.preventDefault();
    const loginOk = loginValidate();
    console.log(loginOk, "loginOk")
    if (loginOk) {
      props.login({ email: inputData.email, password: inputData.password },
        () => {
          history('/ponuda');
        });
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
              <input type="text" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Korisničko ime" onChange={(e => { onChangeData("email", e) })} value={inputData.email} />
              {errors.email && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                Email mora biti u formatu example@domain.com
              </span>}
            </div>

            <div className="flex flex-col space-y-1">
              <input type="password" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Password" onChange={(e => { onChangeData("password", e) })} value={inputData.password} />
              {errors.password && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                Password obavezan. Min 4 znaka.
              </span>}
            </div>

            <div className="relative">
              <input type="checkbox" className="inline-block align-middle" />
              <label className="inline-block align-middle" htmlFor="remember">Upamti me</label>

            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
              <a href="#" className="inline-block text-blue-500 hover:text-blue-800 hover:underline">Forgot your password?</a>
              <button type="submit" className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
                onClick={loginHandler}>
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
