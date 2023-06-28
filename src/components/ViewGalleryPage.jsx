import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGalleryById } from "../service/GalleriesService";

const ViewGalleryPage = () => {
  const [gallery, setGallery] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
    }
  }, [id]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card " style={{ width: "300px" }}>
        <div className="card-body">

          <h2 className="card-title">{gallery.name}</h2>
          <p className="card-text">Description: {gallery.description}</p>

        </div>
      </div>
    </div>
  );
};
export default ViewGalleryPage;
