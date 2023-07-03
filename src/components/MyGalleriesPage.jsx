import { useContext, useEffect, useState } from "react";
import GalleryContext from "../storage/GalleryContext";
import UserContext from "../storage/UserContext";
import { getUserGalleries, filterGalleries } from "../service/GalleriesService";
import { Link, useNavigate } from "react-router-dom";

const MyGalleriesPage = () => {
  const navigate = useNavigate();
  const { galleries, updateGalleries } = useContext(GalleryContext);
  const { user, signedIn } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState([]);

  useEffect(() => {
    if (!signedIn && !user && !user.user) {
      navigate("/login");
    }
  }, [signedIn, user, navigate]);
  useEffect(() => {
    if (filterTerm !== "") {
      const filtered = filterGalleries(galleries, filterTerm);
      setFilteredGalleries(filtered);
    } else {
      setFilteredGalleries(galleries);
    }
  }, [filterTerm, galleries]);

  useEffect(() => {
    loadGalleries();
  }, [page, user]);

  const loadGalleries = () => {
    getUserGalleries(user?.user?.id, page).then(({ data }) => {
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
          <form onSubmit={handleFilterSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Unesite termin za filtriranje"
            value={filterTerm}
            onChange={handleFilterChange}
          />
        </form>
      {Array.isArray(filteredGalleries) && filteredGalleries.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {filteredGalleries.map((gallery) => (
            <div
              key={gallery?.id}
              className="col m-5"
              style={{ width: "340px" }}
            >
              <div className="card shadow-sm">
                <div className="card-body bg-light border rounded border">
                  {gallery.urls && gallery.urls.length > 0 ? (
                    <img
                      src={gallery.urls[0]}
                      className="card-img-top"
                      alt="Gallery image"
                    />
                  ) : (
                    <p className="d-block">No image available</p>
                  )}
                  <Link
                    className="btn btn-outline-warning d-block"
                    to={`galleries/${gallery.id}`}
                  >
                    <h2 className="card-text">{gallery.name}</h2>
                  </Link>
                  <Link to={`authors/${gallery.user_id}`} className="d-block">
                    Author: {gallery.user?.first_name} {gallery.user?.last_name}
                  </Link>
                  <div className="d-block">
                    Created at: <p>{gallery.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No galleries found.</p>
      )}

      { hasMore && Array.isArray(galleries) && galleries.length > 0 && hasMore && (
        <button className="btn btn-secondary" onClick={loadMoreGalleries}>
          Load more
        </button>
      )}
    </div>
  );
};

export default MyGalleriesPage;