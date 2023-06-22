import axios from "axios";
import { GenderEnum, Location } from "../types";
import { getBearerToken } from "../utils";

const BASE_API  = import.meta.env.VITE_APP_BASE_API

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

    googleLogin(googleToken: string) {
        return axios.post(BASE_API + "/auth/google_login", {
            googleToken: googleToken
        });
    }

    updateUserInfo(
        name: string, 
        gender: GenderEnum, 
        university: string|null,
        birthDate: Date,
        occupation: string|null,
        company: string|null,
        bio: string|null,
        location: Location,
        interestedIn: string[],
        isFirst: boolean
    ) {
        if (isFirst) {
            return axios.post(BASE_API + "/user/updateUserData", {
                name: name, 
                gender: gender, 
                university: university,
                birthdate: birthDate,
                occupation: occupation,
                company: company,
                userImages: "",
                bio: bio,
                location: location,
                interestedIn: interestedIn,
            },
            {
                headers: {authorization: getBearerToken()}
            })
        } else {
            return axios.post(BASE_API + "/user/updateUserData", {
                name: name, 
                university: university,
                occupation: occupation,
                company: company,
                userImages: "",
                bio: bio,
                location: location,
                interestedIn: interestedIn,
            },
            {
                headers: {authorization: getBearerToken()}
            })
        }
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