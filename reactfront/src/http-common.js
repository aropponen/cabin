import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44304/",
    headers: {
        "Content-type": "application/json"
    }
});