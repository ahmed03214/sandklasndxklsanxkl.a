import axios from "axios";

const API = process.env.NEXT_PUBLIC_PUBLIC_URL;

const handler = async (req, res) => {
  const query = req.query;
  const { withHidden } = query;

  const { data: services } = await axios(`${API}/getService.php`);

  if (withHidden) {
    res.status(200).json(services.services);
  } else {
    const withoutHidden = services.services.filter(
      (service) => !service.hidden
    );

    res.status(200).json(withoutHidden);
  }
};

export default handler;
