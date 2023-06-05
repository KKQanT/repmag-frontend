import axios from "axios";
import { getBearerToken } from "../utils";

const BASE_API = "http://localhost:4000";

class imageService {
  uploadImage(file: File) {
    const formdata = new FormData();
    formdata.append("file", file);
    console.log(formdata)
    return axios.post(BASE_API + '/image/upload_image', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: getBearerToken()
      }
    });
  }

  queryImage(filename: string) {
    return axios.get(BASE_API + `/image/get_image/${filename}`, {
      headers: {
        authorization: getBearerToken()
      }
    }
    );
  }
}

export default new imageService();