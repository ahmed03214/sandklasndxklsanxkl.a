import React from "react";

import FullLayout from "../../src/layouts/FullLayout";
import ServiceCard from "../../src/components/ServiceCard";
import { Row, Col } from "reactstrap";

import axios from "axios";
import useAuth from "../../src/hooks/useAuth";

const API = process.env.NEXT_PUBLIC_LOCAL_URL;

const Services = ({ services, auth }) => {
  return (
    <FullLayout adminData={auth}>
      <main className="container pb-5">
        <Row>
          {services?.map((service, idx) => (
            <Col md={6} className="py-2" key={idx}>
              <ServiceCard
                key={idx}
                id={service.id}
                name={service.name}
                desc={service.des}
                className="border"
                adminView
                hidden={service.hidden}
              />
            </Col>
          ))}
        </Row>
      </main>
    </FullLayout>
  );
};

export default Services;

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

  const { data: services } = await axios(
    `${API}/api/getServices?withHidden=true`
  );

  return {
    props: {
      services,
      auth: checkAuth.auth,
    },
  };
};
