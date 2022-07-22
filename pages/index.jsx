import Head from "next/head";
import { Col, Row, Button } from "reactstrap";

import ProjectTables from "../src/components/dashboard/ProjectTable";
import FullLayout from "../src/layouts/FullLayout";

import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../src/hooks/useAuth";
import useAdminController from "../src/hooks/useAdminController";
import useCookie from "../src/hooks/useCookie";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_LOCAL_URL;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,6}$/);
};

const Dashboard = ({ admins, auth }) => {
  const [adminsData, setAdminsData] = useState(admins);
  const cookies = useCookie();

  const { Admin } = useAdminController();

  const addAdminModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Input login data",
      html: `
      <label for="user-name" class="text-start d-block mb-2">name</label>
      <div class="input-group mb-3">
        <input id="user-name" type="text" placeholder="type user name" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>

      <label for="user-email" class="text-start d-block mb-2">email</label>
      <div class="input-group mb-3">
        <input id="user-email" type="email" placeholder="type user email" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>

      <label for="user-password" class="text-start d-block mb-2">password</label>
      <div class="input-group mb-3">
        <input id="user-password" type="password" placeholder="type user password" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>

      <label for="user-password-repeat" class="text-start d-block mb-2">repeat password</label>
      <div class="input-group mb-3">
        <input id="user-password-repeat" type="password" placeholder="repeat user password" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>

      <div class="mb-3 flex-start gap-2">
      <label for="super-admin-checkbox" class="text-start d-block">is super admin?</label>
        <input id="super-admin-checkbox" type="checkbox">
      </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("user-name").value,
          email: document.getElementById("user-email").value,
          password: document.getElementById("user-password").value,
          repeatPassword: document.getElementById("user-password-repeat").value,
          isSuperAdmin: document.getElementById("super-admin-checkbox").checked,
        };
      },
    });

    if (formValues) {
      const addAdmin = (formValues) => {
        Admin.add({
          data: {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
            token: cookies.get("token"),
            super: formValues.isSuperAdmin ? "1" : "0",
          },
          cb: async () => {
            const admins = await Admin.getAll();

            setAdminsData(admins);
          },
        });
      };

      formValues.isSuperAdmin && (formValues.super = formValues.isSuperAdmin);
      formValues.token = cookies.get("token");

      const { email, name, password, repeatPassword } = formValues;

      if (!password || !email || !name) {
        return Swal.fire("error", "please fill all data", "error");
      }

      if (!validateEmail(email)) {
        return Swal.fire("error", "please type valid email", "error");
      }

      if (password !== repeatPassword) {
        return Swal.fire(
          "error",
          "Password and repeat Password are not the same",
          "error"
        );
      }

      if (password.length < 8) {
        return Swal.fire("error", "type strong password", "error");
      }

      if (formValues.super) {
        return Swal.fire({
          title: "Are you sure?",
          html: `The super admin position can add or remove other admins <span style="font-weight: bold; color: red">including you</span>`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add him",
        }).then((result) => {
          if (result.isConfirmed) return addAdmin(formValues);
        });
      }

      addAdmin(formValues);
    }
  };

  return (
    <FullLayout adminData={auth}>
      <div>
        <Head>
          <title>Yomnak NextJS Dashboard</title>
          <link rel="icon" href="/favicon.ico" />

          {/* Block Search Indexing with 'noindex' */}
          <meta name="robots" content="noindex" />
        </Head>
        <div>
          {/***Table ***/}
          <Row>
            <Col lg="12" sm="12">
              <Button
                onClick={addAdminModal}
                className="btn mb-3 px-3 ms-auto d-block"
                color="primary"
              >
                + New
              </Button>

              <ProjectTables
                setAdminsData={setAdminsData}
                admins={adminsData}
              />
            </Col>
          </Row>
        </div>
      </div>
    </FullLayout>
  );
};

export default Dashboard;

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

  const { data: admins } = await axios.post(`${API}/api/getAdmins`, {
    token,
  });

  return {
    props: {
      auth: checkAuth.auth,
      admins: admins.data,
    },
  };
};
