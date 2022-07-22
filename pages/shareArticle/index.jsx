import React from "react";
import ShareArticle from "../../src/components/shareArticle";

import useAuth from "../../src/hooks/useAuth";

const API = process.env.NEXT_PUBLIC_LOCAL_URL;

const NewArticle = ({ auth }) => {
  return <ShareArticle adminData={auth} />;
};

export default NewArticle;

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
