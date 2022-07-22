import axios from "axios";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handler = async (req, res) => {
  const { data: social } = await axios(`${API}/social.php`);

  if (social.code === 200) {
    return res.status(200).json(social.social);
  }

  return res.status(200).json({ code: 400, message: "not allowed" });
};

export default handler;
