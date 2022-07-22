import axios from "axios";
import createFormData from "../../src/utils/createFormData";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handelar = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send({ code: 400, message: "not allowed" });
  }

  const { facebook, twitter, linkedin, snapshat, youtube, token } = req.body;

  if (!token || !facebook || !twitter || !linkedin || !snapshat || !youtube) {
    return res.status(200).send({
      code: 400,
      message: "please type all social links",
    });
  }

  const formData = createFormData({ ...req.body });

  const { data } = await axios.post(`${API}/social-add.php`, formData);

  res.status(200).send(data);
};

export default handelar;
