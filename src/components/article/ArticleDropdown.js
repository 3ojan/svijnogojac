import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { getArticle } from "../store/actions/articleAction"

import axios from "axios"
import { useNavigate } from 'react-router';
import { dropDownClassName } from '../pages/insert/NewAd.syled.css';
function ArticleDropdown(props) {

  const articles = useSelector(state => {
    return state.articlesState.articles
  });

  const [selecteditem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!articles || articles.length === 0) {
      props.getArticle();
    } else {
      setItems(articles);
      props.onSelect && props.onSelect(articles[0]._id)
    }
  }, [articles]);

  const onSetSelectedItems = (e, i) => {
    setSelectedItem(e.target.value);
    props.onSelect && props.onSelect(e.target.value)
  }

  return (
    <div >
      {items && items.length !== 0 ?
        <div className="mb-3 xl:w-96">
          <select className={dropDownClassName} aria-label="Default select example"
            onChange={onSetSelectedItems}
            value={selecteditem ? selecteditem : items[0]._id}
          >
            {items && items.map(item => {
              return <option value={item._id}>{item.name}</option>
            })}}
          </select>
        </div>
        : <div>Nema spremljenih artikala</div>}
    </div>
  );
}
const mapStateToProps = (state) => ({ article: state.articlesState })
export default connect(mapStateToProps, { getArticle })(ArticleDropdown)
