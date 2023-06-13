import { AxiosResponse } from "axios";

export const notifyError = (resp: AxiosResponse<any, any>) => {
  alert("error" + resp.status + " : " + resp.data.message);
}

export const getBearerToken = () => {
  return window.localStorage.getItem("bearerToken");
}

export const getTime = () => {
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

export function calculateAge(birthDate: Date) {
  if (birthDate) {
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
  } else {
    return 0
  }
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  console.log('buffer', buffer)
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function preprocessImgData(respData): string {
  console.log("preprocessImgData invoked");
  console.log(respData);
  const base64Flag = 'data:image/jpeg;base64,';
  const imgStr = arrayBufferToBase64(respData.data.data);
  return base64Flag + imgStr
}