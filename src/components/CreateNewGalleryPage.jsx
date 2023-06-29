import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addGallery,
  editGalleryById,
  getGalleryById,
} from "../service/GalleriesService";

const CreateNewGalleryPage = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [""]
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (gallery.name.length < 2 || gallery.name.length > 255) {
      return alert("Gallery Name must be between 2 and 255 characters");
    }

    if (gallery.description.length > 1000) {
      return alert("Description can have a maximum of 1000 characters");
    }

    if (gallery.urls.length === 0) {
      return alert("At least one URL is required");
    }

    if (gallery.urls.some(url => !isValidImageUrl(url))) {
      return alert("Invalid URL format. Please make sure to enter a valid image URL ending with .png, .jpg, or .jpeg");
    }

    if (id) {
      editGalleryById(id, gallery);
    } else {
      addGallery(gallery.name, gallery.description, gallery.urls);
      setGallery({
        name: "",
        description: "",
        urls: [""],
      });
    }

    navigate("/my-galleries");
  };

  const isValidImageUrl = (url) => {
    const imageExtensions = [".png", ".jpg", ".jpeg"];
    const lowercasedUrl = url.toLowerCase();

    return imageExtensions.some(extension => lowercasedUrl.endsWith(extension));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUrlChange = (event, index) => {
    const { value } = event.target;
    setGallery((prevState) => {
      const updatedUrls = [...prevState.urls];
      updatedUrls[index] = value;
      return {
        ...prevState,
        urls: updatedUrls,
      };
    });
  };

  const handleAddUrl = () => {
    setGallery((prevState) => ({
      ...prevState,
      urls: [...prevState.urls, ""],
    }));
  };

  const handleRemoveUrl = (index) => {
    if (gallery.urls.length === 1) {
      return; 
    }
    setGallery((prevState) => {
      const updatedUrls = [...prevState.urls];
      updatedUrls.splice(index, 1);
      return {
        ...prevState,
        urls: updatedUrls,
      };
    });
  };

  const handleMoveUrl = (currentIndex, targetIndex) => {
    if (
      targetIndex < 0 ||
      targetIndex >= gallery.urls.length ||
      currentIndex === targetIndex
    ) {
      return;
    }
  
    setGallery((prevState) => {
      const updatedUrls = [...prevState.urls];
      const urlToMove = updatedUrls[currentIndex];
      updatedUrls.splice(currentIndex, 1);
      updatedUrls.splice(targetIndex, 0, urlToMove);
      return {
        ...prevState,
        urls: updatedUrls,
      };
    });
  };

  return (
    <div>
      <form
        className="container mt-5"
        style={{ width: "300px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-floating mt-3">
          <input
            name="name"
            value={gallery.name}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <label>Gallery Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="description"
            value={gallery.description}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="description"
          />
          <label>Description</label>
        </div>
        <div className="mt-3">
          <label>Image URLs:</label>
          {gallery.urls.map((url, index) => (
            <div key={index}>
              <input
                value={url}
                type="text"
                className="form-control"
                onChange={(event) => handleUrlChange(event, index)}
                placeholder="URL"
                required
              />
              <div className="mt-1">
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => handleRemoveUrl(index)}
                >
                  Remove
                </button>
                {index !== gallery.urls.length - 1 && (
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleAddUrl}
                  >
                    Add Another URL
                  </button>
                  
                )}
                {index !== 0 && (
        <button
          className="btn btn-sm btn-secondary me-2"
          onClick={() => handleMoveUrl(index, index - 1)}
        >
          Move Up
        </button>
      )}
      {index !== gallery.urls.length - 1 && (
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => handleMoveUrl(index, index + 1)}
        >
          Move Down
        </button>
      )}
              </div>
            </div>
          ))}
        </div>
  
        <div>
          {id ? (
            <button
              className="w-100 btn btn-lg btn-warning mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Edit
            </button>
          ) : (
            <button
              className="w-100 btn btn-lg btn-success mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default CreateNewGalleryPage;
