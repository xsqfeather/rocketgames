import axios from "axios";
import { ENDPOINT } from "../constants";

export function getProfile() {
  axios.get(`${ENDPOINT}/lobby/getProfile`, {});
}
