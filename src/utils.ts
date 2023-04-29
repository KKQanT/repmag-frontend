import { AxiosResponse } from "axios";

export const notifyError = (resp: AxiosResponse<any, any>) => {
    alert("error"  + resp.status + " : " + resp.data.message);
}

export const getBearerToken = () => {
    return window.localStorage.getItem("bearerToken");
}