import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar.js";
import DatePicker from "react-datepicker";
import { connect, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import "react-datepicker/dist/react-datepicker.css";
import { inputClassName, buttonSubmitClassName, dropDownClassName, btnDeleteClassName } from "./NewAd.syled.css.js";
import { getCategories, updateArticle, getArticleById, deleteArticle } from "../../store/actions/articleAction";
import { getCategoryName } from "../../store/reducers/articleReducer.js";
// components

const categoryDropDown = (items, callback, slectedValue) => {
  return <div >
    {items && items.length !== 0 ?
      <div className="mb-3 xl:w-96">
        <select className={dropDownClassName} aria-label="Default select example"
          onChange={callback}
          value={slectedValue ? slectedValue : items[0]._id}
        >
          {items && items.map(item => {
            return <option key={item._id} value={item._id}>{item.name}</option>
          })}
        </select>
      </div>
      : <div>Nema spremljenih kategorija</div>}
  </div>
}

function Editarticle(props) {
  const params = useParams();
  const history = useNavigate();
  const [articleName, setArticleName] = useState("");
  const [categorySelect, setCategorySelect] = useState();
  const [isDisabled, setisDisabled] = useState(true);

  const categories = useSelector(state => {
    return state.articlesState.categories
  });

  useEffect(() => {
    const callback = (response) => {
      console.log(response);
      // setLoadedArticle(response);
      setArticleName(response ? response[0].name : articleName)
    };
    props.getArticleById(params.id, callback);
  }, []);

  useEffect(() => {
    if (!categories) {
      props.getCategories();
    } else {
      if (categories.length > 0)
        setCategorySelect(categories[0]._id);
    }
  }, [categories]);

  const onChangeData = (e) => {
    setArticleName(e.target.value);
    const buttonDisabled = e.target.value === "";
    setisDisabled(buttonDisabled)
    console.log(buttonDisabled);
  }
  const onCategorySet = (e) => {
    setCategorySelect(e.target.value);
  }

  const onSubmit = () => {
    const callback = () => {
      history('/viewarticles');
    }
    console.log(getCategoryName(categorySelect))
    props.updateArticle(params.id, {
      categoryName: getCategoryName(categorySelect),
      name: articleName, category: categorySelect
    }, callback);
  }

  const onDelete = () => {
    props.deleteArticle(params.id, () => {
      history('/viewarticles');
    })
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
                  Uređivanje artikla
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  <br />
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
                      Unos artikla
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-gray-600">

                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Odaberi kategoriju
                      </label>
                      {categoryDropDown(categories, onCategorySet, categorySelect)}
                    </div>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Naziv artikla
                      </label>
                      <input
                        type="text"
                        className={inputClassName}
                        placeholder="Naziv artikla"
                        value={articleName}
                        onChange={onChangeData}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className={buttonSubmitClassName(!isDisabled)}
                        type="submit"
                        onClick={onSubmit}
                        disabled={isDisabled}
                      >
                        Spremi Artikal
                      </button>
                      <button
                        className={btnDeleteClassName(true)}
                        type="submit"
                        onClick={onDelete}
                      >
                        Obriši artikal
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

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { getCategories, updateArticle, getArticleById, deleteArticle })(Editarticle)
