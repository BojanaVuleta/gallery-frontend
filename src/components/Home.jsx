import { useContext, useEffect, useState } from "react";
import GalleryContext from "../storage/GalleryContext";
import { getGalleries } from "../service/GalleriesService";
import { Link } from "react-router-dom";


const Home = () => {
  const { galleries, updateGalleries} = useContext(GalleryContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadGalleries();
  }, [page]);

  const loadGalleries = () => {
    getGalleries(page).then(({ data }) => {
      updateGalleries(data.data);
      console.log(data)
    });
  };

  const loadMoreGalleries = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      {Array.isArray(galleries) && galleries.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="col m-5" style={{ width: "340px" }}>
              <div className="card shadow-sm">
                <div className="card-body bg-light border rounded border">         
                <img src={gallery.urls[0]} alt="Gallery" />
                  <Link
                    className="btn btn-outline-warning"
                    to={`galleries/${gallery.id}`}
                  >
                    <h2 className="card-text">{gallery.name}</h2>
                  </Link>
                 <Link to={`authors/${gallery.user.id}`} > Author: {gallery.user.first_name} {gallery.user.last_name} </Link>
                  Created at: <p>{gallery.created_at}</p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No galleries found.</p>
      )}

      {Array.isArray(galleries) && galleries.length > 1 && (
        <button className="btn btn-primary" onClick={loadMoreGalleries}>
          Učitaj više
        </button>
      )}
    </div>
  );
};

export default Home;