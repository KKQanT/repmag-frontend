import axios from "axios";
import { GenderEnum, PreferencesType } from "../types";
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
        name: string, 
        gender: GenderEnum, 
        university: string,
        age: number,
        occupation: string,
        preferences: PreferencesType
    ) {
        return axios.post(BASE_API + "/user/updateUserData", {
            name: name, 
            gender: gender, 
            university: university,
            age: age,
            occupation: occupation,
            preferences: preferences
        },
        {
            headers: {authorization: getBearerToken()}
        })
    }

    getSelfProfile() {
        return axios.get(BASE_API + "/user/getSelfProfile", {
            headers: {authorization: getBearerToken()}
        })
    }

    getRecomendedUsers(){
        return axios.get(BASE_API + "/user/getRecommendedUsers", {
            headers: {authorization: getBearerToken()}
        })
    }

    
}

export default new userServices();