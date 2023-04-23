import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_API  = process.env.BASE_API

export default {
    signUp(email:string, password:string) {
        return axios.post(BASE_API + "/auth/signUp", {
            email: email,
            password: password
        });
    },

    login(email: string, password: string) {
        return axios.post(BASE_API + "/auth/login", {
            email: email,
            password: password
        });
    }
}