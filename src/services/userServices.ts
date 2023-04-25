import axios from "axios";

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
}

export default new userServices();