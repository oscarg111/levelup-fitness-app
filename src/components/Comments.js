import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./PostPopup.css";
import "./Comments.css";
import CommentCard from "./CommentCard";

const Comments = ({ isOpen, onClose, post, username }) => {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log(commentContent);
    console.log(username);
    console.log(post._id);
    await fetch(`${process.env.REACT_APP_API_URL}/auth/comment/${post._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentContent: commentContent,
        commenter: username,
      }),
    })
      .then((response) => {
        console.log(comments);
        let comment = {
          commentContent: commentContent,
          commenter: username,
          commentTime: new Date(),
        };
        setComments([comment, ...comments]);
        console.log(comments);
      })
      .catch((error) => console.error("Error:", error));
    setCommentContent("");
  };

  // use effect to set scrolling off
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll"); // Disable scrolling
    } else {
      document.body.classList.remove("no-scroll"); // Enable scrolling
    }

    // Cleanup function to remove class on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  // use effect to fetch comments

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/comments/${post._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json(); // Parse JSON response
        setComments(data); // Update comments state
        console.log(data); // Log fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (post._id) {
      fetchComments();
    }
  }, []); // Re-run when post._id changes

  return ReactDOM.createPortal(
    <div className="post-popup">
      <div className="popup-content">
        <button className="popup-close-button" onClick={onClose}>
          x
        </button>
        <div className="add-comment">
          <h4>New Comment</h4>
          <input
            value={commentContent}
            style={{ width: "90%" }}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <h1>Comments</h1>
        {comments.length > 0 ? (
          comments.map((comment) => <CommentCard comment={comment} />)
        ) : (
          <p>No comments</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Comments;
