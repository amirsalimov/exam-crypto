import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type PaginationTypes = {
  totalPages: number;
  currentPage: number;
  onPageChange: Function;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationTypes) => {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxPageNumbers = 5;

    let startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <li
          key={1}
          className={`w-8 h-8 cursor-pointer text-sky-300 flex items-center justify-center`}
          onClick={() => handlePageChange(1)}
        >
          1
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li key="dot-start" className="text-sky-300">
            ...
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`w-8 h-8 cursor-pointer text-sky-300 flex items-center justify-center ${
            i === page ? "rounded-full bg-zinc-700" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="dot-end" className="text-sky-300">
            ...
          </li>
        );
      }
      pageNumbers.push(
        <li
          key={totalPages}
          className={`w-8 h-8 cursor-pointer text-sky-300 flex items-center justify-center`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mb-7 gap-5">
      <button
        className="flex items-center justify-center"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        {}
        <ChevronLeftIcon
          size={26}
          className={`text-sky-300 ${page === 1 && "opacity-30"}`}
        />
      </button>
      <ul className="text-sky-300 flex items-center gap-2">
        {renderPageNumbers()}
      </ul>
      <button
        className="flex items-center justify-center"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        {}
        <ChevronRightIcon
          size={26}
          className={`text-sky-300 ${page === totalPages && "opacity-30"}`}
        />
      </button>
    </div>
  );
};

export default Pagination;
