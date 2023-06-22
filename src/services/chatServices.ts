import axios from "axios";
import { getBearerToken } from "../utils";

const BASE_API  = import.meta.env.VITE_APP_BASE_API

class chatServices {
    getChatHistory(partnerUserID: string) {
        return axios.get(BASE_API + '/chat/chatHistory/' + partnerUserID,
        {
            headers: {authorization: getBearerToken()}
        })
    }
}

export default new chatServices();