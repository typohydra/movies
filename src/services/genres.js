import axios from "axios";
const baseUrl = "http://localhost:3001/genres";

const getAllGenres = async () => {
  const genres = await axios.get(baseUrl);
  return genres.data;
};

export { getAllGenres };
