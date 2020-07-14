import React from 'react';

const Pagination = ({ personPerTab, numOfPeople, paginate }) => {
  const pageNumbers = [];
  for (let i = 1;i <= Math.ceil(numOfPeople / personPerTab);i += 1) {
    pageNumbers.push(i);
  }
  return (
    <td>
      <ul className="pagination">
        { pageNumbers.map((number) => (
          <li key={ number } className="page-item">
            <a onClick={ () => paginate(number) } href="" className="page-link">{ number }</a>
          </li>
        )) }
      </ul>
    </td>
  );
};

export default Pagination;
