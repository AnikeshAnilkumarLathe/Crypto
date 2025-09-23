import React from 'react';

function Pagination({ total, coins_perpage, setCurrent_page, current_page }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(total / coins_perpage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <button
          key={page} onClick={() => setCurrent_page(page)}
          style={{
            margin: "0 5px",
            padding: "10px 15px",
            background: page === current_page ? "lightgreen" : "white",
            borderRadius: "3px",
            cursor: "pointer"
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
