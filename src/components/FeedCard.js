import React, { useState } from "react";
import reportIcon from "../assets/report.png";
import commentIcon from "../assets/comment_icon.png";
import ReportPopup from "./report";
import "./feedCard.css";
import { formatDistanceToNow } from "date-fns";
import DeleteConfirmation from "./DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import UpdatePost from "./UpdateWorkout";
import hulk from "../assets/hulk.png";
import heroBase from "../assets/hero-base-male.png";
import Comments from "./Comments";

const FeedCard = ({ post, username }) => {
  const navigate = useNavigate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const deletePost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/post/${post._id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Post was deleted");
    }
    navigate("/feed");
  };

  return (
    <div className="feed-card">
      <div className="card-top">
        <p>
          @{post.userName} uploaded a new workout{" "}
          {formatDistanceToNow(new Date(post.createdAt))} ago
        </p>
        {/* <ReportPopup /> */}
      </div>
      <div className="upload-info">
        <div className="character-column">
          <img className="hero-image" src={heroBase} alt="hero image" />
        </div>
        <div className="workout-column">
          <div className="workout-info">
            <p>Hero: {post.heroName}</p>
            <p>{post.postContent}</p>
            <p>
              Workout:
              {post.workout.map((exercise) => (
                <p>{exercise}</p>
              ))}
            </p>{" "}
          </div>
        </div>
        {/* Brandon and ari here are your respective components please work on these */}

        {/* <UpdatePost /> */}
        <br></br>

        <div className="comment-section">
          <img
            onClick={() => setShowComments(true)}
            src={commentIcon}
            alt="comment button"
          />
        </div>
        <div>
          {username === post.userName && (
            <DeleteConfirmation onDelete={deletePost} />
          )}
          {username === post.userName && (
            <button onClick={() => setShowUpdateModal(true)}>
              Update Post
            </button>
          )}
        </div>
      </div>
      {showUpdateModal && (
        <UpdatePost
          isOpen={showUpdateModal}
          post={post}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
      {showComments && (
        <Comments
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          post={post}
          username={username}
        />
      )}
    </div>
  );
};

export default FeedCard;
