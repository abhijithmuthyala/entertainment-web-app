import { API } from "@/constants";
import { fetchData } from "@/utils";

export default async function handler(req, res) {
  try {
    const { page, media_type } = req.query;
    const url = API[media_type](page);
    const data = await fetchData(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.KEY}`,
      },
    });
    res.status(200).json(data.results);
  } catch (error) {
    console.error(error);
    res.status(error.message.status).send(error.message.status_message);
  }
}
