import { Card } from "react-bootstrap";
import { Image } from "./image";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "../axios";
import { useEffect, useState } from "react";

const PostCard = ({ post, user }, props) => {
  let history = useHistory();

  const [vote, setVote] = useState(0);

  const upvote = async (id, user) => {
    if (!user) {
      history.push("Login");
    }

    try {
      const res = await axios.post(
        `/api/post/${id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data === 1) {
        setVote(vote + 1);
      } else {
        setVote(vote - 1);
      }
    } catch (error) {
      console.log("Message send failed.", error);
    }
  };

  useEffect(() => {
    setVote(post.upvote.length);
  }, [post.upvote.length]);

  return (
    <div {...props} className="card-layout d-flex">
      <div className="card-ranking">
        <button className="border-0" onClick={() => upvote(post._id, user)}>
          ↑
        </button>
        <p>{vote}</p>
      </div>

      <div className="card-right w-100">
        <div className="card-bottom p-0 flex-grow-1">
          <div>
            <div className="overflow-auto">
              <h3 className="card-title">
                Posted by {post.username} on {post.date}
              </h3>
            </div>
            <h2>
              <p>{post.title}</p>
            </h2>
          </div>
          {post.attachment.every((val, index) => val !== "") && (
            <Image postid={post._id} src={post.attachment} />
          )}
            <p>{post.text}</p>
          <div className="card-bottom">

            <Link to={{ pathname: "/post/" + post._id}}>
              See all {post.comment_count} comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostCard };
