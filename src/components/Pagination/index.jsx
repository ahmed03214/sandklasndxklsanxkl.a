import React, { useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Item from "./Item";

import style from "../../../styles/pagination.module.scss";

const Pagination = ({
  className = "",
  pagePerRow,
  lastPage,
  getDataByPage,
}) => {
  const [firstPageNow, setFirstPage] = useState(1);
  const [cuurentPage, setCuurentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pagenationHandelar = async (amount) => {
    setIsLoading(true);

    try {
      await getDataByPage(amount);

      // Scroll To Top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setCuurentPage(amount);
      setIsLoading(false);

      if (amount < cuurentPage && amount < cuurentPage + 2) {
        setFirstPage(amount);
      }

      if (amount > cuurentPage && amount >= firstPageNow + 2) {
        setFirstPage(amount);
      }

      //
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <article className={`${className} ${style.pagination}`}>
      <ul className="flex-center gap-2 list-unstyled">
        {/* first page */}
        <Item
          disabled={cuurentPage === 1 || isLoading}
          onClick={() => pagenationHandelar(cuurentPage - 1)}
        >
          <IoIosArrowForward />
        </Item>

        {/* Prev row pages */}
        <Item
          onClick={() => pagenationHandelar(cuurentPage - 3)}
          disabled={cuurentPage === 1 || isLoading || cuurentPage - 3 < 1}
        >
          <span>...</span>
        </Item>

        {/* Normal pagination */}
        {[...Array(+pagePerRow)].map((_, idx) => {
          const cuurentNum = firstPageNow + idx;

          return (
            <Item
              onClick={() => pagenationHandelar(cuurentNum)}
              active={cuurentNum === cuurentPage}
              disabled={lastPage < cuurentNum || isLoading}
              key={idx}
            >
              <span>{cuurentNum}</span>
            </Item>
          );
        })}

        {/* Last page */}
        {lastPage > pagePerRow && (
          <Item
            active={lastPage === cuurentPage}
            onClick={() => pagenationHandelar(lastPage)}
          >
            <span>{lastPage}</span>
          </Item>
        )}

        {/* Next row pages */}
        <Item
          onClick={() => pagenationHandelar(cuurentPage + 3)}
          disabled={
            cuurentPage === lastPage || isLoading || cuurentPage + 3 > lastPage
          }
        >
          <span>...</span>
        </Item>

        {/* Last page */}
        <Item
          disabled={cuurentPage === lastPage || isLoading}
          onClick={() => pagenationHandelar(cuurentPage + 1)}
        >
          <IoIosArrowBack />
        </Item>
      </ul>
    </article>
  );
};

export default Pagination;
