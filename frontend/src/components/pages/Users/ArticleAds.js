import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar/Sidebar";
import { connect, useSelector } from 'react-redux';
import { getAdsByArticleId } from '../../store/actions/articleAction';
import UserTable from '../../Tables/UserTable';
import { useNavigate, useParams } from 'react-router';
import CardTable from '../../Tables/CardTable';
import { getArticleName } from '../../store/reducers/articleReducer';
// components

function ArticleAds(props) {

  const params = useParams();
  window.params = params;

  const [state, setState] = useState({
    allAdsByArticle: null,
    title: "",
  })

  useEffect(() => {
    const callback = (response) => {
      const title = getArticleName(params.articleId)
      setState({ ...state, allAdsByArticle: response, title });
    }
    props.getAdsByArticleId(params.articleId, callback);
  }, []);




  return (
    <>
      <Sidebar></Sidebar>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="profile-wrapper">
            {/* <section className="pb-20 relative block">
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
            </section> */}
            {/* {allAdsByArticle && <CardTable title="Svi oglasi člana" color={"dark"} data={userAds}></CardTable>} */}
            {state.allAdsByArticle && <CardTable title={state.title} color={"dark"} data={state.allAdsByArticle}></CardTable>}
          </div>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { getAdsByArticleId })(ArticleAds)