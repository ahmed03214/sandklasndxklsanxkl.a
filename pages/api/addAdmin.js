import axios from "axios";
import createFormData from "../../src/utils/createFormData";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handelar = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send({ code: 400, message: "not allowed" });
  }

  const { email, password, token } = req.body;

  if (!token || !email || !password) {
    return res.send({ code: 400, message: "not allowed" });
  }

  const formData = createFormData({ ...req.body });

  const { data } = await axios.post(`${API}/add-admin.php`, formData);

  res.status(200).send(data);
};

export default handelar;
