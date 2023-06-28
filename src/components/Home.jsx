import { useContext, useEffect, useState } from "react";
import GalleryContext from "../storage/GalleryContext";
import { getGalleries } from "../service/GalleriesService";
import { Link } from "react-router-dom";

const Home = () => {
  const { galleries, updateGalleries} = useContext(GalleryContext);
  const [loadedGalleries, setLoadedGalleries] = useState(10);

  useEffect(() => {
    getGalleries().then(({ data }) => {
      updateGalleries(data);
    });
  }, []);

  const loadMoreGalleries = () => {
    setLoadedGalleries(prevLoadedGalleries => prevLoadedGalleries + 10);
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(galleries)
          ?  galleries.slice(0, loadedGalleries).map((gallery, id) => (
              <div key={id} className="col m-5" style={{ width: "340px" }}>
                <div className="card shadow-sm">
                  <div className="card-body bg-light border rounded border">
                    <Link className="btn btn-outline-warning"
                        to={`galleries/${gallery.id}`}><h1 className="card-text">{gallery.name}</h1></Link>
                    <div className="mb-1 text-body-secondary">     
         

                    </div>
 
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {Array.isArray(galleries) && loadedGalleries < galleries.length && (
        <button className="btn btn-primary" onClick={loadMoreGalleries}>
          Učitaj više
        </button>
      )}
    </div>
  );
};
export default Home;
