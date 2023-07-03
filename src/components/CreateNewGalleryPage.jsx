import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../storage/UserContext";
import {
  addGallery,
  editGalleryById,
  getGalleryById,
} from "../service/GalleriesService";
import { Link } from "react-router-dom";

const CreateNewGalleryPage = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [""],
  });
  const { user } = useContext(UserContext);
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

    if (id) {
      editGalleryById(id, gallery);
    } else {
      addGallery(gallery.name, gallery.description, gallery.urls, user.user.id);
      setGallery({
        name: "",
        description: "",
        urls: [],
      });
    }

    navigate("/");
  };

  const isValidImageUrl = (url) => {
    const imageExtensions = [".png", ".jpg", ".jpeg"];
    const lowercasedUrl = url.toLowerCase();

    return imageExtensions.some((extension) =>
      lowercasedUrl.endsWith(extension)
    );
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
    const lastUrl = gallery.urls[gallery.urls.length - 1];

    if (!isValidImageUrl(lastUrl)) {
      return alert(
        "Invalid URL format. Please make sure to enter a valid image URL ending with .png, .jpg, or .jpeg"
      );
    }
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
          <ul>
            {gallery.urls.map((url, index) => (
              <li key={index}>
                <div className="d-flex align-items-center mb-2">
                  <input
                    value={url}
                    type="text"
                    className="form-control me-2"
                    onChange={(event) => handleUrlChange(event, index)}
                    placeholder="URL"
                    required
                  />
                  {index !== gallery.urls.length - 1 && (
                    <>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleRemoveUrl(index)}
                        type="button"
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => handleMoveUrl(index, index - 1)}
                        disabled={index === 0}
                        type="button"
                      >
                        Move Up
                      </button>

                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => handleMoveUrl(index, index + 1)}
                        disabled={index === gallery.urls.length - 2}
                        type="button"
                      >
                        Move Down
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button
            className="d-block btn btn-sm btn-secondary"
            onClick={handleAddUrl}
            type="button" 
          >
            Add Another URL
          </button>
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
          <Link to="/my-galleries"><button className="w-100 btn btn-lg btn-danger mt-3">Cancel</button></Link>
        </div>
      </form>
    </div>
  );
};
export default CreateNewGalleryPage;