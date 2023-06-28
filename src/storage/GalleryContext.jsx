import { createContext } from "react";

const GalleryContext = createContext({
  galleries: [],
  updateGalleries: () => {},
  addGalery: () => {},
});

export default GalleryContext;
