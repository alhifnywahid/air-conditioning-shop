import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { RxDotsHorizontal } from "react-icons/rx";
import ReactPaginate from "react-paginate";

function Pagination({ pages, onPageChange }) {
  const className = ["join-item", "btn", "btn-square", "border-none"].join(" ");
  return (
    <ReactPaginate
      breakLabel={<RxDotsHorizontal />}
      nextLabel={<FcNext />}
      previousLabel={<FcPrevious />}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      pageCount={pages.totalPages}
      onPageChange={onPageChange}
      disableInitialCallback={true}
      className="join"
      pageLinkClassName={className}
      previousLinkClassName={className}
      nextLinkClassName={className}
      breakLinkClassName={className}
      activeLinkClassName={`${className} bg-blue-500 text-white hover:bg-blue-600`}
      disabledLinkClassName={`${className} btn-disabled`}
    />
  );
}

export default Pagination;
