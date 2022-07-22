import axios from "axios";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handler = async (req, res) => {
  const { num } = req.query;
  const { data: articles } = await axios(`${API}/pagination/${num}`);

  if (articles.code != 200) {
    return res.status(200).json({ code: 400, message: "article Not Found" });
  }

  res.status(200).json(articles);
};

export default handler;
