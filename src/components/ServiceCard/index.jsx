/* eslint-disable @next/next/no-img-element */
import React from "react";
import style from "../../../styles/services.module.scss";
import Link from "next/link";

const ServiceCard = ({
  dataAos = "",
  dataAosDuration = "",
  desc,
  id,
  name,
  className = "",
  adminView,
  hidden,
}) => {
  return (
    <Link href={`/editService/${id}`}>
      <article
        data-aos={dataAos}
        data-aos-auration={dataAosDuration}
        className={`${style.serviceCard} ${className} p-3 cu-pointer`}
      >
        <div className="logo mb-3">
          <img width={50} src="/service-card-icon.webp" alt="" />
        </div>
        <div className="data">
          {hidden && (
            <div className="position-absolute bottom-0 end-0 py-2 px-3">
              <i
                style={{ width: "35px", height: "35px" }}
                className="bi bi-eye-slash fs-5 bg-danger p-2 text-light rounded-circle flex-center"
              />
            </div>
          )}

          {adminView && (
            <div className="position-absolute top-0 end-0 py-2 px-3">
              <i
                style={{ width: "35px", height: "35px" }}
                className="bi bi-pencil-fill fs-5 bg-primary p-2 text-light rounded-circle flex-center"
              />
            </div>
          )}
          <p className="name h3 mb-4 text-cut">{name}</p>
          <p className="description text-cut w-95 text-muted">{desc}</p>
        </div>
      </article>
    </Link>
  );
};

export default ServiceCard;
