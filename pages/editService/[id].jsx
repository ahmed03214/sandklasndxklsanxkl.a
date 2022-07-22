import React from "react";
import useAuth from "../../src/hooks/useAuth";
import FullLayout from "../../src/layouts/FullLayout";

import { Form, FormGroup, Label, Button, Row, Col } from "reactstrap";

import { useForm } from "react-hook-form";
import useAdminController from "../../src/hooks/useAdminController";
import axios from "axios";

import { useRouter } from "next/router";

import Swal from "sweetalert2";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const EditService = ({ auth, serviceData }) => {
  const { Services } = useAdminController();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.id = serviceData.id;

    if (data.hide) {
      data.hide = "1";
    } else {
      data.hide = "0";
    }

    Services.update({
      data,
      cb: (message) => {
        Swal.fire("Done!", message, "success");

        setTimeout(() => router.push("/services"), 1500);
      },
    });
  };

  return (
    <FullLayout adminData={auth}>
      <main className="pb-5">
        <p className="text-muted mb-4 text-center">
          Please type data with same structure
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {Object.keys(serviceData).map((key, idx) =>
              key === "id" ? (
                ""
              ) : key === "hide" ? (
                <FormGroup key={idx}>
                  <div className="form-check form-switch d-block mt-2">
                    <input
                      {...register(key)}
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      defaultChecked={+serviceData[key] ? true : false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      {key}
                    </label>
                  </div>
                </FormGroup>
              ) : (
                <Col key={idx} md={6}>
                  <FormGroup>
                    <Label for="email">{key}</Label>
                    <input
                      {...register(key, {
                        value: serviceData[key],
                        required: {
                          message: "please fill all inputs",
                          value: true,
                        },
                      })}
                      placeholder="type your change"
                      type="text"
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              )
            )}
          </Row>

          {/* First error message */}
          <p className="error fw-bold mt-2 px-2 fs-5 text-danger">
            {errors[Object.keys(errors)[0]]?.message}
          </p>

          <Button className="btn" color="primary">
            Save
          </Button>
        </Form>
      </main>
    </FullLayout>
  );
};

export default EditService;

// get service Data for edit
export const getServerSideProps = async ({ req, query }) => {
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

  const { id } = query;

  // get data by id or redirect
  const { data: serviceData } = await axios(
    `${API}/get-service-edit.php?id=${id}&token=${token}`
  );

  if (serviceData.code === 400) {
    return {
      redirect: {
        permanent: false,
        destination: "/services",
      },
    };
  }

  return {
    props: {
      auth: checkAuth.auth,
      serviceData,
    },
  };
};
