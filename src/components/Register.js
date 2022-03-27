import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { login } from "./store/actions/userAction"
import axios from "axios"

function Register(props) {

  useEffect(() => {
  }, []);

  const registerHandler = () => {
    const registerUserData = {
      email: "test@test.hr",
      password: "1234",
      firstName: "test",
      lastName: "user"
    }
    axios.post("http://localhost:2999/register", registerUserData)
      .then(res => {
        console.log(res)
        if (res.data.success === true) {
          // this.$store.commit('authUser')
          // this.$router.push({
          //   name: "Dashboard"
          // })
        } else {
          // this.register.status = res.data.message
        }
      })
  }


  return (
    <div className="font-sans min-h-screen antialiased bg-gray-900 pt-24 pb-5">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <h1 className="font-bold text-center text-4xl text-yellow-500">Svinje<span className="text-blue-500">App</span></h1>
        <form action="#">
          <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
            <h1 className="font-bold text-xl text-center">Registracija novog korisnika</h1>
            <div className="flex flex-col space-y-1">
              <input type="text" name="email" id="email" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="email" />
            </div>
            <div className="flex flex-col space-y-1">
              <input type="text" name="firstname" id="firstname" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="firstname" />
            </div>
            <div className="flex flex-col space-y-1">
              <input type="text" name="lastname" id="lastname" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="lastname" />
            </div>
            <div className="flex flex-col space-y-1">
              <input type="text" name="role" id="role" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="role" />
            </div>

            <div className="flex flex-col space-y-1">
              <input type="password" name="password" id="password" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Password" />
            </div>

            {/* <div className="relative">
              <input type="checkbox" name="remember" id="remember" className="inline-block align-middle" />
              <label className="inline-block align-middle" htmlFor="remember">Upamti me</label>
            </div> */}

            <div className="flex flex-col-reverse sm:flex-column sm:justify-between items-center">
              <button type="submit" className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={registerHandler}>
                Login
              </button>
              <button type="submit" className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" onClick={registerHandler}>
                Registracija
              </button>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
              <a href="#" className="inline-block text-blue-500 hover:text-blue-800 hover:underline">Zaboravljena lozinka</a>
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
export default connect(mapStateToProps, { login })(Register)
