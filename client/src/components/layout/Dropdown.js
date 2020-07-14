import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  const toggle = () => setOpen(!open);

  const onClick = (item) => {
    if (!selection.find((current) => current.id === item.id))
      setSelection([item]);
  };

  const isSelected = (item) => {
    if (selection.find((current) => current.id === item.id)) return true;
    return false;
  };

  return (
    <div className="dropdown-wrapper">
      <div t
        abIndex={ 0 }
        className="dropdown-header"
        role="button"
        onKeyPress={ () => toggle(!open) }
        onClick={ () => toggle(!open) }>
        <div className="dropdown-header-title">
          <p>{ title }</p>
        </div>
        <div className="dropdown-header-actions">
          <p>{ open ? 'close' : 'open' }</p>
        </div>
      </div>
      { open && (
        <ul className="dropdown-items">
          {
            items.map((item) =>
              <li className="dropdown-list-item" key={ item.id }>
                <button type="button" onClick={ () => onClick(item) }>
                  <span>{ item.value }</span>
                  <span>{ isSelected(item) && <Link to={ { pathname: `/${item.link}` } }></Link> }</span>
                </button>
              </li>)
          }
        </ul>
      ) }
    </div >
  );
};
export default Dropdown;