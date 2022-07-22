import React from "react";
import ShareArticle from "../../src/components/shareArticle";
import axios from "axios";

import useAuth from "../../src/hooks/useAuth";

const EditArticle = ({ article, auth }) => {
  return <ShareArticle adminData={auth} article={article} />;
};

export default EditArticle;

const API = process.env.NEXT_PUBLIC_LOCAL_URL;

export const getServerSideProps = async (req) => {
  const { token } = req.req.cookies;

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

  const { id } = req.query;

  const { data: article } = await axios(`${API}/api/getArticleById/${id}`);

  if (article.code != 200) {
    return {
      redirect: {
        permanent: false,
        destination: "/shareArticle",
      },
    };
  }

  return {
    props: {
      auth: checkAuth.auth,
      article: article.data,
    },
  };
};
