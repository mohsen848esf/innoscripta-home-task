import React, { FC, ReactNode } from "react";
import ReactPaginate from "react-paginate";

interface IPagination{
    handlePageClick: (e:number) => void;
    breakLabel?:string|ReactNode
    nextLabel?:string|ReactNode
    pageRangeDisplayed?:number
    pageCount:number
    previousLabel ?:string|ReactNode
    previousClassName?:string
    nextClassName?:string
    containerClassName?:string
    pageClassName?:string
    activeClassName?:string
  }

const Pagination:FC<IPagination> = ({
  handlePageClick,
  breakLabel = "...",
  nextLabel = "next >",
  pageRangeDisplayed = 5,
  pageCount,
  previousLabel = "< previous",
  ...res
}) => {
  return (
    <div className="mt-14 ">
      <ReactPaginate
        // breakLabel={breakLabel}
        nextLabel={nextLabel}
        onPageChange={({selected})=>handlePageClick(selected)}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel={previousLabel}
        renderOnZeroPageCount={null}
        pageLinkClassName="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-slate-400 dark:bg-slate-300"
        activeLinkClassName="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-slate-700 dark:text-violet-100 dark:border-violet-400"
        nextClassName="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:bg-green-200"
        previousClassName="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:bg-green-200"
        {...res}
      />
    </div>
  );
};

export default Pagination;
