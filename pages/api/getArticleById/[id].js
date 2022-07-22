import axios from "axios";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handler = async (req, res) => {
  const { id } = req.query;
  const { data: article } = await axios(`${API}/get_article.php?id=${id}`);

  if (article.code != 200) {
    return res.status(200).json({ code: 400, message: "article Not Found" });
  }

  res.status(200).json(article);
};

export default handler;
