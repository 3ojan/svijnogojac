import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar/Sidebar";
import { connect, useSelector } from 'react-redux';
import { getAdds, getArticle, getCategories } from "../../store/actions/articleAction"
import { getArticleName, getCategoryName } from '../../store/reducers/articleReducer';
import TotalArticlesTable from '../../Tables/TotalArticlesTable';
import Dropdown from '../../dropdown/Dropdown';
// components


function Potraznja(props) {

  const ads = useSelector(state => {
    return state.articlesState.ads
  });
  const articles = useSelector(state => {
    return state.articlesState.articles
  });
  const categories = useSelector(state => {
    return state.articlesState.categories
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

    selectedCategory: null,
    allItems: [],
  });

  const onAdsAndArticlesLoaded = () => {
    if (ads && articles) {

      const buyItems = ads.filter(item => item.buysell === 1);
      const sellItems = ads.filter(item => item.buysell === 2);
      const activeItems = ads.filter(item => item.status === 1);
      const inActiveItems = ads.filter(item => item.status === 2);
      const ended = ads.filter(item => item.status === 3);

      const filteredItems = getFilteredItems(items.selectedCategory, sellItems);

      const allItems = []
      categories.map((item, index) => {
        allItems.push({
          name: item.name,
          items: getFilteredItems(item._id, sellItems),
          id: index
        });
      })

      setItems({
        ...items,
        all: ads,
        buy: buyItems,
        sell: sellItems,
        activeItems,
        inActiveItems,
        ended,

        filteredByCategory: filteredItems,
        allItems
      });
    }
  }

  useEffect(() => {
    if (!ads) {

    } else {
      onAdsAndArticlesLoaded()
    }
  }, [ads, articles]);

  useEffect(() => {
    if (!categories) {
      props.getCategories();
    } else {
      if (categories.length > 1) {
        onSelectCategory(categories[0]._id)
      }
      props.getAdds();
      props.getArticle();
    }
  }, [categories]);


  const getFilteredItems = (categoryId, sell) => {
    sell = sell || items.sell;
    if (sell) {
      const data = sell.filter(item => item.category === categoryId)

      const filteredData = {};
      data.map(item => {
        if (!filteredData[item.article]) {
          filteredData[item.article] = {};
          filteredData[item.article].wantedPrice = 0;
          filteredData[item.article].amount = 0;
          filteredData[item.article].total = 0;
          filteredData[item.article]._id = item.article;
        }
        filteredData[item.article].name = getArticleName(item.article)
        filteredData[item.article].wantedPrice += item.wantedPrice;
        filteredData[item.article].amount += item.amount;
        filteredData[item.article].total++;

      });
      const d = []
      Object.keys(filteredData).forEach(key => {
        d.push(filteredData[key])
      });
      return d;
    }
    return [];
  }

  const onSelectCategory = (e) => {
    const value = e.target ? e.target.value : e;
    const filteredData = getFilteredItems(value);
    setItems({ ...items, selectedCategory: value, filteredByCategory: filteredData });
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
            {items.allItems && items.allItems.map(item => {
              return < TotalArticlesTable key={item.id} data={item.items} title={`Potražnja-${item.name}`}></TotalArticlesTable>
            })}
          </div>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => ({ users: state.articlesState })
export default connect(mapStateToProps, { getAdds, getArticle, getCategories })(Potraznja)