import React, { useEffect, useState, useCallback } from "react";

import { Container, Row, Button } from "reactstrap";
import ArticleThumbnail from "../../src/components/ArticleThumbnail";
import FullLayout from "../../src/layouts/FullLayout";
import Pagination from "../../src/components/Pagination";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import Link from "next/link";

import axios from "axios";
import useAuth from "../../src/hooks/useAuth";

const Articles = ({ auth }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getDataByPage = useCallback(async (page) => {
    const { data: articles } = await axios(`/api/getArticlesByNum/${page}`);

    setCurrentPage(page);
    setArticles(articles);
  }, []);

  useEffect(() => {
    getDataByPage(1);
  }, [getDataByPage]);

  return (
    <FullLayout adminData={auth}>
      <Container className="mt-3 pb-5 mb-2">
        <Link href="/shareArticle">
          <Button className="btn mb-3 px-3 ms-auto d-block" color="primary">
            + New Article
          </Button>
        </Link>
        <Row>
          {!articles?.data?.length ? (
            <p className="mt-4">
              <LoadingSpinner />
            </p>
          ) : (
            articles?.data?.map(({ title, id, desc, img, hash, date }, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4 py-2 px-3">
                <ArticleThumbnail
                  idx={idx + 1}
                  id={id}
                  title={title}
                  desc={desc || "no description"}
                  img={img}
                  hash={hash}
                  date={date}
                  adminView
                  getDataByPage={getDataByPage}
                  currentPage={currentPage}
                />
              </div>
            ))
          )}
        </Row>

        <Pagination
          getDataByPage={getDataByPage}
          pagePerRow={3}
          lastPage={articles?.pages}
          className="mt-4"
        />
      </Container>
    </FullLayout>
  );
};

export default Articles;

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  const auth = useAuth(token);

  const checkAuth = await auth.checkAuth();

  if (!checkAuth.auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      auth: checkAuth.auth,
    },
  };
};
