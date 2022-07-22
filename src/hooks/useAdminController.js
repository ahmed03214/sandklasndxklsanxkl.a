import axios from "axios";
import Swal from "sweetalert2";

import useCookie from "./useCookie";

const LOCAL_API = process.env.NEXT_PUBLIC_LOCAL_URL;
const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const useAdminControler = () => {
  const cookies = useCookie();

  // Admins
  const addAdmin = async ({ data: adminData, cb }) => {
    axios
      .post(`${LOCAL_API}/api/addAdmin`, adminData)
      .then(({ data }) => {
        if (data.code === 200) {
          const successMessage = `${adminData.name} has been added to the ${
            JSON.parse(adminData.super) ? "super admin" : "admin"
          } position`;

          Swal.fire("success!", successMessage, "success");

          return cb();
        }

        Swal.fire("error!", data.msg || data.message, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  const delAdmin = ({ data, cb }) => {
    data.token = cookies.get("token");

    axios
      .post(`${LOCAL_API}/api/delAdmin`, data)
      .then(({ data }) => {
        if (data.code === 200) {
          return cb();
        }

        Swal.fire("error!", data.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  const getAdmins = async () => {
    const token = cookies.get("token");

    const response = await axios
      .post(`${LOCAL_API}/api/getAdmins`, {
        token,
      })
      .then(({ data }) => {
        if (data.code === 200) {
          return data.data;
        }

        Swal.fire("error!", data.msg || data.message, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });

    return response || null;
  };

  // Article
  const checkData = (data) => {
    data.token = cookies.get("token");

    const { title, article, hash, keywords, token } = data;

    if (!token || !title || !article || !hash || !keywords) {
      Swal.fire("error!", "fill data", "error");

      return false;
    }

    const formData = new FormData();

    // Add to form data
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    });

    return formData;
  };

  const shareArticle = ({ data, cb }) => {
    const formData = checkData(data);

    if (!formData) return;

    axios
      .post(`${API}/add-article.php`, formData)
      .then(({ data }) => {
        if (data.code === 200) return cb(data.msg);

        Swal.fire("error!", data.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  const updateArticle = ({ data, cb }) => {
    const formData = checkData(data);

    if (!formData) return;

    axios
      .post(`${API}/edit-article.php`, formData)
      .then(({ data }) => {
        if (data.code === 200) return cb(data.msg);

        Swal.fire("error!", data.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  const delArticle = ({ data, cb }) => {
    data.token = cookies.get("token");

    axios
      .post(`${LOCAL_API}/api/delArticle`, data)
      .then(({ data }) => {
        if (data.code === 200) {
          return cb();
        }

        Swal.fire("error!", data.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  // Services
  const editService = ({ data, cb }) => {
    data.token = cookies.get("token");

    axios
      .post(`${LOCAL_API}/api/updateService`, data)
      .then(({ data: res }) => {
        if (res.code === 200) return cb(res.msg);

        Swal.fire("error!", res.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  // General
  const updateSocial = ({ data }) => {
    data.token = cookies.get("token");

    axios
      .post(`${LOCAL_API}/api/updateSocial`, data)
      .then(({ data }) => {
        if (data.code === 200) {
          const successMessage = `social links has been updateing`;
          return Swal.fire("success!", successMessage, "success");
        }

        Swal.fire("error!", data.msg, "error");
      })
      .catch(() => {
        Swal.fire("error!", "error in server", "error");
      });
  };

  // Boxs
  const Admin = {
    add: addAdmin,
    delete: delAdmin,
    getAll: getAdmins,
  };

  const Article = {
    share: shareArticle,
    delete: delArticle,
    update: updateArticle,
  };

  const Services = {
    update: editService,
  };

  return { Admin, Article, updateSocial, Services };
};

export default useAdminControler;
