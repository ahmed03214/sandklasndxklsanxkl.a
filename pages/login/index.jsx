/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../styles/loginForm.module.scss";

import useAuth from "../../src/hooks/useAuth";

import { Form, FormGroup, Label, Button } from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

const schema = yup.object({
  email: yup.string().required("please fill all inputs"),
  password: yup.string().required("please fill all inputs"),
});

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    auth.login({
      data,
      cb: () => {
        router.push("/");
      },
    });
  };

  return (
    <>
      <Head>
        <title>Yomnak NextJS Dashboard - login</title>
        <meta
          name="description"
          content="Monster Free Next Js Dashboard Template"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-10 vh-100 d-flex justify-content-center align-items-center">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.loginForm} border p-3 rounded`}
        >
          <div style={{ width: "60px" }} className="img d-block m-auto mb-2">
            <img className="w-100" src="/logo.webp" alt="" />
          </div>

          <FormGroup>
            <Label for="email">Email</Label>
            <input
              id="email"
              name="email"
              placeholder="type your email"
              type="text"
              className="form-control"
              {...register("email")}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <input
              id="password"
              name="password"
              placeholder="type your password"
              type="password"
              className="form-control"
              {...register("password")}
            />
          </FormGroup>

          {/* First error message */}
          <p className="error fw-bold mt-2 px-2 fs-5 text-danger">
            {errors[Object.keys(errors)[0]]?.message}
          </p>

          <Button className="btn" color="primary">
            login
          </Button>
        </Form>
      </main>
    </>
  );
};

export default Login;

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  const auth = useAuth(token);

  const checkAuth = await auth.checkAuth();

  if (checkAuth.auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      auth: checkAuth.auth,
    },
  };
};
