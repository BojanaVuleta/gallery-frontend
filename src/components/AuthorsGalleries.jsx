import { useContext, useEffect, useState } from "react";
import GalleryContext from "../storage/GalleryContext";
import { getAuthorGalleries, filterGalleries } from "../service/GalleriesService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const AuthorsGallery = () => {
  const { galleries, updateGalleries } = useContext(GalleryContext);
  const [authorId, setAuthorId] = useState(""); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState([]);

  const { id } = useParams();
  
  useEffect(() => {
    loadGalleries();
  }, [authorId, page]);

  useEffect(() => {
    if (filterTerm !== "") {
      const filtered = filterGalleries(galleries, filterTerm);
      setFilteredGalleries(filtered);
    } else {
      setFilteredGalleries(galleries);
    }
  }, [filterTerm, galleries]);

  const loadGalleries = () => {
    getAuthorGalleries(id, page).then(({ data }) => {
      if (page === 1) {
        updateGalleries(data.data);
      } else {
        updateGalleries((prevGalleries) => [...prevGalleries, ...data.data]);
      }

      if (data.current_page < data.last_page) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  };

  const loadMoreGalleries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadGalleries();
  };

  return (
    <div className="container">
      <div className="my-4">
        <form onSubmit={handleFilterSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Unesite termin za filtriranje"
            value={filterTerm}
            onChange={handleFilterChange}
          />
          <button className="btn btn-primary mt-2" type="submit">
            Filtriraj
          </button>
        </form>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(filteredGalleries)
          ? filteredGalleries.map((gallery, id) => (
              <div key={id} className="col m-5" style={{ width: "340px" }}>
                <div className="card shadow-sm" >
                  <div className="card-body bg-light border rounded border" >
                  <Link
                  className="btn btn-outline-warning d-block"
                  to={`/galleries/${gallery.id}`}
                >
                  <h2 className="card-text" style={{ color: "black"}}>{gallery.name} </h2>
                </Link>
                    <div className="mb-1 text-body-secondary">
                      description: {gallery.description}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {hasMore && Array.isArray(galleries) && galleries.length > 0 && (
        <button className="btn btn-primary" onClick={loadMoreGalleries}>
          Učitaj više
        </button>
      )}
    </div>
  );
};

export default AuthorsGallery;