import { API } from "@/constants";
import { fetchData } from "@/utils";

export default async function handler(req, res) {
  try {
    const { query, mediaType, page } = req.query;
    const data = await fetchData(API.search(mediaType || "multi", query, page));
    if (data.success === false) {
      throw new Error(data);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(error.message.status).send(error.message.status_message);
  }
}
