import axios from "axios";
import { getBearerToken } from "../utils";

const BASE_API  = "http://localhost:4000"

class chatServices {
    getChatHistory(partnerUserID: string) {
        return axios.get(BASE_API + '/chat/chatHistory/' + partnerUserID,
        {
            headers: {authorization: getBearerToken()}
        })
    }
}

export default new chatServices();