import { API } from "../shared/api";

export const getGalleries = () => {
  return API.get("/galleries");
};

export const addGallery = (
  name,
  description,
  urls,
  user_id,
 
) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    user_id
  });
};


export const getGalleryById = (id) => {
  return API.get(`/galleries/${id}`);
};

export const editGalleryById = (id, gallery) => {
  return API.put(`/galleries/${id}`, gallery);
};

export const deleteGalleryById = (id) => {
  return API.delete(`/galleries/${id}`);
};


