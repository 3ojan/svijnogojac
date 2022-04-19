import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar/Sidebar";
import ArticleTable from "../../Tables/ArticleTable";
import { connect, useSelector } from 'react-redux';
import { getAdds, getArticle, getCategories } from "../../store/actions/articleAction"
// components

let names = {};
const getCategorieName = (id, categorie) => {
  if (names[id]) {
    return names[id];
  }
  const item = categorie.filter(item => item._id === id);
  if (item[0]) {
    names[id] = categorie.filter(item => item._id === id)[0].name
  }
  return names[id];
}


function ViewArticles(props) {

  const articles = useSelector(state => {
    return state.articlesState.articles
  });
  const categories = useSelector(state => {
    return state.articlesState.categories
  });

  useEffect(() => {
    if (!articles) {
      props.getArticle();
    } else {

    }
  }, [articles]);

  useEffect(() => {
    if (!categories) {
      props.getCategories();
    } else {

    }
  }, [categories]);

  return (
    <>
      <Sidebar></Sidebar>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="profile-wrapper">
            <section className="pb-20 relative block">
              <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                <div className="flex flex-wrap text-center justify-center">
                  <div className="w-full lg:w-6/12 px-4">
                    <h2 className="text-4xl font-semibold text-white">
                      <br />
                    </h2>
                    <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    </p>
                  </div>
                </div>

              </div>
            </section>
            {categories && articles && <ArticleTable color={"dark"} data={articles}></ArticleTable>}
          </div>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => ({ users: state.articlesState })
export default connect(mapStateToProps, { getArticle, getCategories })(ViewArticles)