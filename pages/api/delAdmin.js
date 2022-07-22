import axios from "axios";
import createFormData from "../../src/utils/createFormData";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handelar = async (req, res) => {
  if (req.method !== "POST") {
    return res.send({ code: 400, message: "not allowed" });
  }

  const { id, token } = req.body;

  if (!token || !id) {
    return res.send({ code: 400, message: "not allowed" });
  }

  const formData = createFormData({ ...req.body, token });

  const { data } = await axios.post(`${API}/delete-admin.php`, formData);

  res.send(data);
};

export default handelar;
