import { useState, useEffect } from "react";

import axios from "../axios";

import { Image } from "../components/image";
import { Card } from "react-bootstrap";
import {
  useLocation,
} from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState({});
  let location = useLocation();
  useEffect(() => {
    setPost(location.state);
    // todo: conditionally make axios request
    let pathname = location.pathname.split("/");
    let id = pathname[pathname.length - 1];
    axios.get("api/post/" + id).then((res) => {
      setPost(res.data[0]);
    });
  }, [location]);
  return (
    <div className="app">
      {post && Object.keys(post).length > 0 ? (
        <Card key={post._id} className="mb-5">
          <Card.Header>
            <p>{post.username}</p>
            <p>{post.date}</p>
          </Card.Header>
          <Image postid={post._id} src={post.attachment} />

          <Card.Body style={{ opacity: 0.8 }}>
            <Card.Text className="my-1">{post.text}</Card.Text>
            <div style={{ overflow: "auto" }}>
              <Card.Text className="float-left mb-1">{post.date}</Card.Text>
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
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export { Post };
