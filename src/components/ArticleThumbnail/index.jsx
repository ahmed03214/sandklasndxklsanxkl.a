/* eslint-disable @next/next/no-img-element */
import React from "react";

import style from "../../../styles/article.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";

import useAdminControler from "../../hooks/useAdminController";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const ArticleThumbnail = ({
  idx,
  id,
  title,
  desc,
  img,
  hash,
  date,
  adminView,
  getDataByPage,
  currentPage,
}) => {
  const { Article } = useAdminControler();

  const getHashColor = () => {
    let result = "";

    switch (idx) {
      case 1:
        result = "#B84A85";
        break;

      case 2:
        result = "#4A73CB";
        break;

      case 3:
        result = "#3DBEE6";
        break;

      case 4:
        result = "#B84A85";
        break;

      case 5:
        result = "#4A73CB";
        break;

      case 6:
        result = "#3DBEE6";
        break;

      default:
        result = "#000";
    }

    return result;
  };

  const deleteArticle = async () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this article",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Article.delete({
          data: { id },
          cb: async () => {
            await getDataByPage(currentPage);

            Swal.fire("Done !", `article has been deleted`, "success");
          },
        });
      }
    });
  };

  return (
    <article
      style={{ cursor: "default" }}
      className={`${style.articleThumbnail} border w-100 bg-lighter`}
    >
      <div className={`${style.img} h-50 mb-3 flex-center position-relative`}>
        <img className="w-100" src={`${API}/${img}`} alt="" />
        <div
          style={{ backgroundColor: getHashColor() }}
          className={`${style.hash} rounded position-absolute bottom-0 end-0`}
        >
          <p className="text-light m-0 py-1 px-2">{hash}</p>
        </div>

        {/* // Add admin Controller */}
        {adminView && (
          <div className="position-absolute w-100 top-0 flex-between px-2 pt-1">
            <i
              onClick={deleteArticle}
              style={{ width: "35px", height: "35px" }}
              className="cu-pointer bi fs-5 bi-trash bg-danger p-2 text-light rounded-circle flex-center"
            />
            <Link href={`/shareArticle/${id}`}>
              <i
                style={{ width: "35px", height: "35px" }}
                className="cu-pointer bi fs-5 bi-pencil-fill bg-primary p-2 text-light rounded-circle flex-center"
              />
            </Link>
          </div>
        )}
      </div>

      <footer className="px-2">
        <p className="title fw-bold m-0 text-cut">{title}</p>

        <p className={`${style.desc} small text-muted`}>
          {/* Get description without html tags */}
          {desc.replace(/<\/?[^>]+(>|$)/g, " ").replace(/(&)[a-z]+;/g, " ")}
        </p>

        <div className="date">
          <p className={`small ${style.date}`}>{date}</p>
        </div>
      </footer>
    </article>
  );
};

export default ArticleThumbnail;
