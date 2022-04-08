import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar/Sidebar";
import CardTable from "../../Tables/CardTable";
import { connect, useSelector } from 'react-redux';
import { getAdds, getArticle } from "../../store/actions/articleAction"
import ArticleDropdown from '../../article/ArticleDropdown';
import { getArticleName } from '../../store/reducers/articleReducer';
import ArticleTable from '../../Tables/ArticleTable';
import ImageUpload from '../../imageupload/ImageUpload';
import { useNavigate } from 'react-router';
// components

function ViewAds(props) {

  const ads = useSelector(state => {
    return state.articlesState.ads
  });
  const articles = useSelector(state => {
    return state.articlesState.articles
  });

  const [items, setItems] = useState({
    ///arrays
    all: null,
    buy: null,
    sell: null,
    activeItems: null,
    inActiveItems: null,
    ended: null,
    ///selecitons
    articleItems: null,
    selectedArticle: null,


  });

  const onAdsAndArticlesLoaded = () => {
    if (ads && articles) {

      const buyItems = ads.filter(item => item.buysell === 1);
      const sellItems = ads.filter(item => item.buysell === 2);
      const activeItems = ads.filter(item => item.status === 1);
      const inActiveItems = ads.filter(item => item.status === 2);
      const ended = ads.filter(item => item.status === 3);

      setItems({
        all: ads,
        buy: buyItems,
        sell: sellItems,
        activeItems,
        inActiveItems,
        ended
      });
    }
  }

  useEffect(() => {
    if (!ads) {
      props.getAdds();

    } else {
      onAdsAndArticlesLoaded()
    }
  }, [ads]);

  useEffect(() => {
    if (!articles) {
      props.getArticle();
    } else {
      onAdsAndArticlesLoaded()
    }
  }, [articles]);

  const onSelectArticle = (articleId) => {
    let articleItems;
    if (items.all) {
      articleItems = items.all.filter(item => item.article === articleId)
    }
    setItems({ ...items, selectedArticle: articleId, articleItems });
    console.log(getArticleName(articleId))
  }

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
            <ArticleDropdown onSelect={onSelectArticle}></ArticleDropdown>
            {<CardTable title={`ARTIKAL - ${getArticleName(items.selectedArticle)}`} color={"dark"} data={items.articleItems} getNameFromId={(id) => { getArticleName({ _id: id }, articles) }}></CardTable>}
            {<CardTable title="POTRAŽNJA" color={"dark"} data={items.buy}></CardTable>}
            {<CardTable title="PONUDA" color={"dark"} data={items.sell}></CardTable>}
            {<CardTable title="AKTIVNI" color={"dark"} data={items.activeItems}></CardTable>}
            {<CardTable title="NEAKTIVNI" color={"dark"} data={items.inActiveItems}></CardTable>}
            {<CardTable title="IZVRŠENI" color={"dark"} data={items.ended}></CardTable>}
          </div>
          <ImageUpload></ImageUpload>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => ({ users: state.articlesState })
export default connect(mapStateToProps, { getAdds, getArticle })(ViewAds)