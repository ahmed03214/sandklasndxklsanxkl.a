import React from "react";
import { Col, Form, Row, FormGroup, Label, Input, Button } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";

const API = process.env.NEXT_PUBLIC_LOCAL_URL;
import axios from "axios";
import useAuth from "../../src/hooks/useAuth";
import useAdminControler from "../../src/hooks/useAdminController";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const socialApps = [
  "youtube",
  "linkedin",
  "twitter",
  "facebook",
  "snapshat",
  "instagram",
];

const schema = yup.object({
  facebook: yup.string().required("please fill all inputs"),
  linkedin: yup.string().required("please fill all inputs"),
  snapshat: yup.string().required("please fill all inputs"),
  twitter: yup.string().required("please fill all inputs"),
  youtube: yup.string().required("please fill all inputs"),
  instagram: yup.string().required("please fill all inputs"),
});

const Social = ({ auth, social }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      facebook: social.facebook?.link,
      linkedin: social.linkedin?.link,
      snapshat: social.snapshat?.link,
      twitter: social.twitter?.link,
      youtube: social.youtube?.link,
      instagram: social.instagram?.link,
    },
  });

  const { updateSocial } = useAdminControler();

  const onSubmit = (data) => {
    // solve pug in server
    data.snapchat = data.snapshat;

    updateSocial({ data });
  };

  return (
    <FullLayout adminData={auth}>
      <main className="mt-5 pt-5 container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {socialApps?.map((social, idx) => (
              <Col md={6} key={idx}>
                <FormGroup>
                  <Label for={social}>
                    {/* // Fix snapchat name */}
                    {social === "snapshat" ? "snapchat" : social}
                  </Label>
                  <input
                    id={social}
                    name={social}
                    {...register(social)}
                    placeholder={`type your ${social} url`}
                    type="url"
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>

          {/* First error message */}
          <p className="error fw-bold mt-2 px-2 fs-5 text-danger">
            {errors[Object.keys(errors)[0]]?.message}
          </p>

          <Button className="btn" color="primary">
            submit
          </Button>
        </Form>
      </main>
    </FullLayout>
  );
};

export default Social;

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

  const { data: social } = await axios(`${API}/api/getSocial`);

  return {
    props: {
      auth: checkAuth.auth,
      social,
    },
  };
};
