import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGalleryById , deleteGalleryById} from "../service/GalleriesService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCommentsByGalleryId } from "../service/GalleriesService";
import UserContext from "../storage/UserContext";
import { useContext } from "react";
import { addComment } from "../service/GalleriesService";


const ViewGalleryPage = () => {
  const [gallery, setGallery] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({});
  const { signedIn } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
      });
      getCommentsByGalleryId(id).then(({ data }) => {
        setComments(data);
        console.log(data);
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

  const handleAddComment = (userId) => {
    if (newComment && userId) {
      addComment(newComment, id, userId)
        .then(({ data }) => {
          setComments([...comments, data]);
          setNewComment("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
      <div className="card" style={{ width: "500px" }}>
        <div className="card-body">

          <h2 className="card-title">{gallery.name}</h2>
          <p className="card-text">Description: {gallery.description}</p>
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
               
                <p>Comment: {comment.description}</p>  
              </li>
              
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>

      {signedIn && (
   <div className="form-floating"><form></form>
   <textarea className="form-control"
    //  value={newComment}
     onChange={(e) => setNewComment(e.target.value)}
     maxLength={1000}
     placeholder="Enter your comment"
   ></textarea>

   <button className="btn btn-primary  " onClick={handleAddComment}>Add Comment</button>
  
 </div>
  )}
    </div>

  );

  
};
export default ViewGalleryPage;
