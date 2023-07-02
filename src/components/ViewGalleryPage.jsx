import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGalleryById , deleteGalleryById} from "../service/GalleriesService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCommentsByGalleryId } from "../service/GalleriesService";
import UserContext from "../storage/UserContext";
import { useContext } from "react";
import { addComment } from "../service/GalleriesService";
import Carousel from "react-bootstrap/Carousel";


const ViewGalleryPage = () => {
  const [gallery, setGallery] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    description: "",
    user_id: "",
    gallery_id: "",
  });
  const { signedIn } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
      getCommentsByGalleryId(id).then(({ data }) => {
        setComments(data.comments);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(comment.description, gallery.id, gallery.user.id)
      .then(() => {
        setComments([...comments, comment]);
        setComment({
          description: "",
        });
        getCommentsByGalleryId(id).then(({ data }) => {
          setComments(data.comments);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "500px" }}>
        <div className="card-body">
          

          <h2 className="card-title">{gallery.name}</h2>
          {/* <Link to={`authors/${gallery.user.id}`} > Author: {gallery.user.first_name} {gallery.user.last_name} </Link> */}
          created: {gallery.created_at}
          <p className="card-text">Description: {gallery.description}</p>

          <Carousel>
              {gallery.urls &&
                gallery.urls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={url}
                      className="d-block w-100"
                      alt={`Slide ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
        
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
</div>
          <Link className="btn btn-outline-warning button-spacing" to={`/edit-gallery/${gallery.id}`} >Edit</Link>
          <button className="btn btn-outline-danger" onClick={handleDeleteGallery}>
          Delete
        </button>     
        </div>
      </div>
      </div>
      <div>
        <h3>Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.description}</p>
               <p>created : {comment.created_at} by {comment.user?.first_name} {comment.user?.last_name}</p>
              </li>
              
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>

      {signedIn && (
        <div className="form-floating">
          <form>
            <textarea
              onChange={handleInputChange}
              className="form-control"
              name="description"
              placeholder="Enter your comment"
              value={comment.description}
              maxLength={1000}
            ></textarea>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Add Comment
            </button>
          </form>
        </div>
      )}
    </div>
  ); 
};
export default ViewGalleryPage;
