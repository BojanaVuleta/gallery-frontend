import { API } from "../shared/api";

export const getGalleries = (page) => {
  return API.get(`/galleries?page=${page}`);
};

export const addGallery = (name, description, urls, user_id) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    user_id,
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

export const getCommentsByGalleryId = (galleryId) => {
  return API.get(`/galleries/${galleryId}/comments`);
};

export const addComment = (
  description,
  gallery_id,
  user_id,
 
) => {
  return API.post('/comments', {
    description,
    gallery_id,
    user_id
  });
};

export const getAuthorGalleries = (id, page) => {
  return API.get(`/authors/${id}?page=${page}`);
};

export const filterGalleries = (galleries, filterTerm) => {
  const searchTerm = filterTerm.toLowerCase();

  return galleries.filter((gallery) => {
    const isMatch =
      gallery.name.toLowerCase().includes(searchTerm) ||
      gallery.description.toLowerCase().includes(searchTerm) ||
      (gallery.user &&
        (gallery.user.first_name.toLowerCase().includes(searchTerm) ||
          gallery.user.last_name.toLowerCase().includes(searchTerm)));

    return isMatch;
  });
};