import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar.js";
import DatePicker from "react-datepicker";
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";
import { radioButtonInputCss, inputClassName, dropDownClassName } from "./NewAd.syled.css.js";
import { storeNewItem, getArticle, getCategories } from "../../store/actions/articleAction.js";
import ArticleDropdown from "../../article/ArticleDropdown.js";
import Dropdown from "../../dropdown/Dropdown.js";

const _items = [
  {
    _id: "HR",
    name: "HR"
  },
  {
    _id: "EU",
    name: "EU"
  },
  {
    _id: "AU",
    name: "AU"
  },
]


function Newad(props) {

  const history = useNavigate();
  const user = useSelector(state => state.users);
  const categories = useSelector(state => state.articlesState.categories);
  const articles = useSelector(state => state.articlesState.articles);

  const [submitData, setsubmitData] = useState({
    article: null,
    owner: null,
    ownerId: null,
    entryDate: new Date(),
    origin: "HR",
    wantedPrice: null,
    finishDate: new Date(),
    comment: null,
    adStatus: "1",
    buysell: "1",
  });

  const [filteredValues, setFilteredValues] = useState({
    dropDownItems: null,
    selectedCategorie: null,
    selectedArticle: null,
    prefferedUnit: "kom"
  })

  useEffect(() => {
    if (user.userData) {
      setsubmitData({
        ...submitData,
        "owner": `${user.userData.firstName} ${user.userData.lastName}`,
        "ownerId": user.userData._id
      })
    }
    if (!user.token) {
      history('/');
    }
  }, [user]);

  useEffect(() => {
    if (!articles) {
      props.getArticle();
    } if (categories && articles) {
      filterDropDown()
    }
  }, [articles]);

  useEffect(() => {
    if (!categories) {
      props.getCategories();
    } if (categories && articles) {
      filterDropDown()
    }
  }, [categories]);


  const filterDropDown = (categorie) => {
    categorie = categorie || categories[0]._id;
    const prefferedUnit = categories.filter(item => item._id === categorie)[0].unit;
    const dropDownItems = articles.filter(item => item.category === categorie)
    const selectedArticle = dropDownItems[0] ? dropDownItems[0]._id : null;
    setFilteredValues({ ...filteredValues, dropDownItems: dropDownItems, selectedCategorie: categorie, selectedArticle: selectedArticle, prefferedUnit })
  }

  const onChangeData = (prop, e) => {
    const data = e.target ? e.target.value : e;
    setsubmitData({
      ...submitData, [prop]: data,
      "article": filteredValues.selectedArticle,
      "category": filteredValues.selectedCategorie,
    })
  }

  console.log(submitData)

  const onSelectArticle = (data) => {
    setFilteredValues({ ...filteredValues, selectedArticle: data.target.value })
  }

  const onSelectCategory = (data) => {
    filterDropDown(data.target.value)
  }

  const onSubmit = () => {
    const callback = () => {
      history('/ponuda');
    }
    props.storeNewItem(submitData, callback);
  }

  return (
    <>
      <Sidebar></Sidebar>
      <div className="profile-wrapper">
        <section className="relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
          </div>
          <div className="container mx-auto px-4 lg:pt-12 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Unos oglasa
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  Pomno unesite podatke potrene za unos oglasa. Unos ??lana mo??e isklju??ivo mjenjati administrator.
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
                        Ponuda/Potra??nja
                      </label>
                      <div className="relative">

                        <div className="flex">
                          <div className="form-check form-check-inline">
                            <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions2" id="buy" value="1" onChange={(e) => { (onChangeData("buysell", e)) }} checked={submitData.buysell === "1"} />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="buy">Ponuda</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions2" id="sell" value="2" onChange={(e) => { (onChangeData("buysell", e)) }} checked={submitData.buysell === "2"} />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="sell">Potra??nja</label>
                          </div>
                        </div>
                      </div>
                    </div>
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
                        <DatePicker className={inputClassName} selected={submitData.entryDate} onChange={(date: Date) => onChangeData("entryDate", date)} minDate={new Date()} />
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
                        value={(user && user.userData) ? `${user.userData.firstName} ${user.userData.lastName}` : ""}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Kategorija
                      </label>
                      <Dropdown items={categories} onSelect={onSelectCategory} selectedItem={filteredValues.selectedCategorie}></Dropdown>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Artikal
                      </label>
                      <Dropdown items={filteredValues.dropDownItems} onSelect={onSelectArticle} selectedItem={filteredValues.selectedArticle}></Dropdown>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Koli??ina
                      </label>
                      <div>
                        <input
                          type="number"
                          className={inputClassName}
                          placeholder="koli??ina"
                          onChange={(e) => { onChangeData("amount", e) }}
                        />
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          {filteredValues.prefferedUnit}
                        </label>
                      </div>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Podrijetlo
                      </label>
                      <Dropdown items={_items} onSelect={(e) => { onChangeData("origin", e) }} selectedItem={_items[0].id}></Dropdown>
                    </div>

                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        O??ekivana cijena
                      </label>
                      <input
                        type="number"
                        className={inputClassName}
                        placeholder="u kn"
                        onChange={(e) => { onChangeData("wantedPrice", e) }}
                      />
                    </div>

                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        O??ekivani rok za izvr??enje
                      </label>
                      <div className="relative">
                        <DatePicker className={inputClassName} onChange={(date: Date) => onChangeData("finishDate", date)} minDate={new Date()}
                          selected={submitData.finishDate}
                        />
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
                        onChange={(e) => { onChangeData("comment", e) }}
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
                          <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" checked={submitData.adStatus === "1"} onChange={(e) => { (onChangeData("adStatus", e)) }} />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio1">Aktivno</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" checked={submitData.adStatus === "2"} onChange={(e) => { (onChangeData("adStatus", e)) }} />
                          <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio2">Neaktivno</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className={radioButtonInputCss} type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" checked={submitData.adStatus === "3"} onChange={(e) => { (onChangeData("adStatus", e)) }} disabled />
                          <label className="form-check-label inline-block text-gray-800 opacity-50" htmlFor="inlineRadio3">Izvr??eno</label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={onSubmit}
                      >
                        Spremi oglas
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
export default connect(mapStateToProps, { storeNewItem, getCategories, getArticle })(Newad)
