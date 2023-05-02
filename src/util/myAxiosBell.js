import axios from "axios";
import myUtil from "./myUtil";
const instance = axios.create({
  baseURL: `${myUtil.apibellserver}`,
});
instance.defaults.withCredentials = true;
export default instance;
