import React from 'react'
import { dropDownClassName } from '../pages/insert/NewAd.syled.css';


function Dropdown(props) {

  const { items, onSelect, selectedItem } = props
  return (
    <div >
      {items && items.length !== 0 ?
        <div className="mb-3 xl:w-96">
          <select className={dropDownClassName} aria-label="Default select example"
            onChange={onSelect}
            value={selectedItem ? selectedItem : items[0]._id}
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
export default Dropdown
