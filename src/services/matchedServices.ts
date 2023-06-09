import axios from "axios";
import { getBearerToken } from "../utils";

const BASE_API  = import.meta.env.VITE_APP_BASE_API

class matchedServices {
    getMatched() {
        return axios.get(BASE_API + "/match/getMatched", {
            headers: {authorization: getBearerToken()}
        })
    }

    likeUser(targetUserID: string) {
        return axios.post(BASE_API + "/match/likeUser", {
            targetUserID: targetUserID
        },
        {
            headers: {authorization: getBearerToken()}
        })
    }

    passUser(targetUserID: string) {
        return axios.post(BASE_API + "/match/passuser", {
            targetUserID: targetUserID
        },
        {
            headers: {authorization: getBearerToken()}
        })
    }
}

export default new matchedServices();