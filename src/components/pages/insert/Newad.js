import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar.js";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux'


import "react-datepicker/dist/react-datepicker.css";
import { radioButtonInputCss, inputClassName } from "./NewAd.syled.css.js";
import { storeNewItem } from "../../store/actions/userAction.js";
// components

// import CardLineChart from "./CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
const dropDownOrigin = (props) => (
  <div >
    <div className="mb-3 xl:w-96">
      <select className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option value="HR">HR</option>
        <option value="EU">EU</option>
        <option value="AU">AU</option>
      </select>
    </div>
  </div>
)

const dropDown = () => (
  <div >
    <div className="mb-3 xl:w-96">
      <select className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option value={true}>Kukuruz</option>
        <option value="1">Svinja</option>
        <option value="2">Škrob</option>
        <option value="3">Nafta</option>
      </select>
    </div>
  </div>
)

function Newad(props) {

  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = () => {
    props.storeNewItem();
  }

  return (
    <>
      <Sidebar></Sidebar>
      <div className="profile-wrapper">
        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Unos oglasa
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  Pomno unesite podatke potrene za unos oglasa. Unos člana može isključivo mjenjati administrator.
                </p>
              </div>
            </div>

          </div>
        </section>

        <section className="relative block py-24 lg:pt-0 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Oglas
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-gray-600">

                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Datum unosa
                      </label>
                      <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <DatePicker className={inputClassName} selected={startDate} onChange={(date: Date) => setStartDate(date)} minDate={new Date()} />
                      </div>
                    </div>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Vlasnik oglasa
                      </label>
                      <input
                        type="text"
                        className={inputClassName}
                        placeholder="Full Name"
                        disabled
                        value={"Mirko Novosel"}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Artikal
                      </label>
                      {dropDown()}
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Podrijetlo
                      </label>
                      {dropDownOrigin()}
                    </div>

                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Očekivana cijena
                      </label>
                      <input
                        type="number"
                        className={inputClassName}
                        placeholder="u kn"
                      />
                    </div>

                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Očekiani rok za izvršenje
                      </label>
                      <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <DatePicker className={inputClassName} selected={startDate} onChange={(date: Date) => setStartDate(date)} minDate={new Date()} />
                      </div>
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Napomena
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Type a message..."
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Status
                      </label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={true} onChange={() => { }} />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">Aktivno</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => { }} />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio20">Neaktivno</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" onChange={() => { }} />
                          <label className="form-check-label inline-block text-gray-800 opacity-50" htmlFor="inlineRadio30">Izvršeno</label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={onSubmit}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({ users: state.users })
export default connect(mapStateToProps, { storeNewItem })(Newad)
