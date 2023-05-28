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

export function calculateAge(birthDate) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = birthDate.getFullYear();
  
    let age = currentYear - birthYear;
  
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
  
    if (currentMonth < birthMonth) {
      age--;
    } else if (currentMonth === birthMonth) {
      const currentDay = currentDate.getDate();
      const birthDay = birthDate.getDate();
  
      if (currentDay < birthDay) {
        age--;
      }
    }
  
    return age;
  }