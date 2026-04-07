// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-project-8f4c3/us-central1/api"
});

export default instance;
