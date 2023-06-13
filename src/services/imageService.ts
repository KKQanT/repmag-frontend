import axios from "axios";
import { getBearerToken } from "../utils";

const BASE_API = "http://localhost:4000";

class imageService {
  uploadImage(file: File) {
    const formdata = new FormData();
    formdata.append("file", file);
    return axios.post(BASE_API + '/image/upload_image', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: getBearerToken()
      }
    });
  }

  updateImage(file: File, imageID: string) {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("imageID", imageID);
    return axios.put(BASE_API + '/image/update_image', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: getBearerToken()
      }
    })
  }

  queryImage(user_id: string) {
    return axios.get(BASE_API + `/image/get_images/${user_id}`, {
      headers: {
        authorization: getBearerToken()
      }
    }
    );
  }

  deleteImage(imageID: string) {
    return axios.post(BASE_API + "/image/delete_image/", {
      imageID: imageID
    },
    {
      headers: {
        authorization: getBearerToken()
      }
    })
  }
}

export default new imageService();