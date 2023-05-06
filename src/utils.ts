import { AxiosResponse } from "axios";

export const notifyError = (resp: AxiosResponse<any, any>) => {
    alert("error"  + resp.status + " : " + resp.data.message);
}

export const getBearerToken = () => {
    return window.localStorage.getItem("bearerToken");
}

export const getTime = ()  => {
    const now = new Date();
    const dateTimeString = now.toLocaleString(
        'en-US',
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    return dateTimeString
}