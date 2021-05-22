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
      history.push('Login')
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
    <Card {...props} className="mb-5">
      
      <div className="d-flex p-0 m-0 rounded">
          <div className="card-ranking rounded-left p-0 text-center">
            <button className="border-0" onClick={() => upvote(post._id, user)}>↑</button>
            <p>{vote}</p>
          </div>
          <div className="p-0 flex-grow-1">
            <Card.Header>
              <div className="overflow-auto">
                <p className="float-left">
                  Posted by {post.username} on {post.date}
                </p>
              </div>
              <p>
                <b>{post.title}</b>
              </p>
            </Card.Header>
            {post.attachment.length > 0 && (
              <Image postid={post._id} src={post.attachment} />
            )}

            <Card.Body style={{ opacity: 0.8 }}>
              <Card.Text className="my-1">{post.text}</Card.Text>
              <div style={{ overflow: "auto" }}>
                <Card.Text className="float-right">
                  <i className="fas fa-share"></i>
                  <i className="fas fa-heart mx-2"></i>
                </Card.Text>
              </div>
              {post.comment.map((comment) => (
                <Card.Text>
                  <span>
                    <b>{comment.username}</b>
                  </span>
                  <span className="ml-3">{comment.text}</span>
                </Card.Text>
              ))}
              <Card.Text>
                <Link to={{ pathname: "/post/" + post._id }}>
                  See all {post.comment_count} comments
                </Link>
              </Card.Text>
            </Card.Body>
          </div>
      </div>
    </Card>
  );
};

export { PostCard };
