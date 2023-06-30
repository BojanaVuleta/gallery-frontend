import { useContext, useEffect, useState } from "react";
import GalleryContext from "../storage/GalleryContext";
import { getAuthorGalleries } from "../service/GalleriesService";
import { useParams } from "react-router-dom";

const AuthorsGallery = () => {
  const { galleries, updateGalleries } = useContext(GalleryContext);
  const [authorId, setAuthorId] = useState(""); // Dodata promenljiva authorId

  const { id } = useParams();
  
  useEffect(() => {
    getAuthorGalleries(id).then(({ data }) => {
      updateGalleries(data.data); // Ispravljeno: updateGalleries(data.data)
      console.log(data.data)
    });
  }, [authorId]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(galleries)
          ? galleries.map((gallery, id) => (
              <div key={id} className="col m-5" style={{ width: "340px" }}>
                <div className="card shadow-sm">
                  <div className="card-body bg-light border rounded border">
                    <h1 className="card-text">{gallery.name}</h1>
                    <div className="mb-1 text-body-secondary">
                      description: {gallery.description}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AuthorsGallery;