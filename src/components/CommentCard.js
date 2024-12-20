import React from "react";
import "./Comments.css";
import { formatDistanceToNow } from "date-fns";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <h5>
        @{comment.commenter} uploaded{" "}
        {formatDistanceToNow(new Date(comment.commentTime))} ago
      </h5>
      <p>{comment.commentContent}</p>
    </div>
  );
};

export default CommentCard;
