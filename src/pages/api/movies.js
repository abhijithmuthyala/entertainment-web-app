import { API } from "@/constants";
import { fetchData } from "@/utils";

export default async function handler(req, res) {
  try {
    const { page } = req.query;
    const url = API.movies(page);
    const data = await fetchData(url, {});
    res.status(200).json(data.results);
  } catch (error) {
    console.error(error);
    res.status(error.message.status).send(error.message.status_message);
  }
}
