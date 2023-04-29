import axios from "axios";
import { GenderEnum } from "../types";
import { getBearerToken } from "../utils";

const BASE_API  = "http://localhost:4000"

class userServices {
    signUp(email:string, password:string) {
        return axios.post(BASE_API + "/auth/signUp", {
            email: email,
            password: password
        });
    }

    login(email: string, password: string) {
        return axios.post(BASE_API + "/auth/login", {
            email: email,
            password: password
        });
    }

    updateUserInfo(
        name: string, gender: GenderEnum, interestedIn: GenderEnum
    ) {
        return axios.post(BASE_API + "/user/updateUserData", {
            name: name, gender: gender, interestedIn: interestedIn
        },
        {
            headers: {authorization: getBearerToken()}
        })
    }

    getSelfProfile() {
        console.log('run getself')
        return axios.get(BASE_API + "/user/getSelfProfile", {
            headers: {authorization: getBearerToken()}
        })
    }
}

export default new userServices();