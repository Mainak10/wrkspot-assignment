import axios from "axios";
import { COUNTRY_LIST_URL } from "./const";

const fetchCountryDetails = async () => {
  return await axios.get(COUNTRY_LIST_URL);
};

export { fetchCountryDetails };
