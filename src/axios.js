// axios.js
import axios from "axios";

const instance = axios.create({
   baseURL: "https://us-central1-clone-project-8f4c3.cloudfunctions.net/api"
});

export default instance;
