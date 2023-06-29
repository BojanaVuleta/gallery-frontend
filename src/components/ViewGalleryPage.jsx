import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGalleryById , deleteGalleryById} from "../service/GalleriesService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewGalleryPage = () => {
  const [gallery, setGallery] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
    }
  }, [id]);

  const handleDeleteGallery = () => {
    if (window.confirm("Are you sure you want to delete this gallery?")) {
      deleteGalleryById(id).then(() => {
        navigate("/my-galleries");
      });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card " style={{ width: "300px" }}>
        <div className="card-body">

          <h2 className="card-title">{gallery.name}</h2>
          <p className="card-text">Description: {gallery.description}</p>
          <Link className="btn btn-outline-warning" to={`/edit-gallery/${gallery.id}`} >Edit</Link>
          <button className="btn btn-danger" onClick={handleDeleteGallery}>
          Delete
        </button>     

        </div>
      </div>
    </div>
  );
};
export default ViewGalleryPage;
