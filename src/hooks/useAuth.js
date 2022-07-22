import axios from "axios";

import Swal from "sweetalert2";
import useCookie from "./useCookie";

const LOCAL_API = process.env.NEXT_PUBLIC_LOCAL_URL;

const useAuth = (token) => {
  const cookie = useCookie();

  const login = ({ data, cb }) => {
    axios
      .post(`${LOCAL_API}/api/login`, data)
      .then(({ data }) => {
        if (data.code === 200) {
          cookie.set({ name: "token", value: data.token, exDays: 7 });
          return cb();
        }

        Swal.fire("error!", data.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  const logut = ({ cb }) => {
    cookie.del("token");
    return cb();
  };

  const checkAuth = async () => {
    if (!token) return { auth: false };

    const data = await axios
      .post(`${LOCAL_API}/api/checkAuth`, { token })
      .then(({ data }) => {
        if (data.code === 200) {
          return { auth: data.data };
        }

        return { auth: false };
      })
      .catch(() => {
        return { auth: false };
      });

    return data;
  };

  return { login, logut, checkAuth };
};

export default useAuth;
