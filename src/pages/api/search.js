import { API } from "@/constants";
import { fetchData } from "@/utils";

export default async function handler(req, res) {
  try {
    const { query, media_type, page } = req.query;
    const url = API.search(media_type, query, page);
    const data = await fetchData(url, {});
    if (data.success === false) {
      throw new Error(data);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.message.status).send(error.message.status_message);
  }
}
