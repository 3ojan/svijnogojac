import React from 'react'
import { dropDownClassName } from '../pages/insert/NewAd.syled.css';

const createOption = (item) => {
  if (item.name) {
    return <option key={item._id} value={item._id}>{item.name}</option>
  }
  if (item.firstName) {
    return <option key={item._id} value={item._id}>{item.firstName} {item.lastName}</option>
  }
}
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
              return createOption(item)
            })}}
          </select>
        </div>
        : <div>{props.notfound || "Nema spremljenih artikala"}</div>}
    </div>
  );
}
export default Dropdown
