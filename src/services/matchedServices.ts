import axios from "axios";
import { getBearerToken } from "../utils";

const BASE_API  = "http://localhost:4000"

class matchedServices {
    getMatched() {
        return axios.get(BASE_API + "/user/getMatched", {
            headers: {authorization: getBearerToken()}
        })
    }
}

export default new matchedServices();