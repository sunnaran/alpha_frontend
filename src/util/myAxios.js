import axios from "axios";
import myUtil from "./myUtil";
const instance = axios.create({
  baseURL: `${myUtil.apiserver}`,
});
instance.defaults.withCredentials = true;
export default instance;
