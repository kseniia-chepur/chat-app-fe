import { API_URL } from "../constants";

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chat-app-photo');

  const response = await fetch(API_URL.cloudinary, {
    method: 'post',
    body: formData,
  });

  const data = await response.json();

  return data;
}

export default uploadFile;
