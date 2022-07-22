import axios from "axios";
import createFormData from "../../src/utils/createFormData";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handelar = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send({ code: 400, message: "not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.send({ code: 400, message: "not allowed" });
  }

  const formData = createFormData({ token });

  const { data } = await axios.post(`${API}/get-admins.php`, formData);

  if (data) {
    res.status(200).send({ code: 200, data });
  }
};

export default handelar;
