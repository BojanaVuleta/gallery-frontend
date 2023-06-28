import { useState } from "react";
import { addGallery } from "../service/GalleriesService";
import GalleryContext from "./GalleryContext";

const GalleryProvider = ({ children }) => {
  const [galleryState, setGalleryState] = useState([]);

  const postNewGallery = (gallery) => {
    addGallery(gallery).then(({ data }) => {
      setGalleryState((prevState) => [...prevState, data]);
    });
  };

  const galleryContext = {
    galleries: galleryState,
    updateGalleries: setGalleryState,
    addGallery: postNewGallery,
  };
  return (
    <GalleryContext.Provider value={galleryContext}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
