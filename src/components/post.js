import { useState, useEffect } from "react";

import axios from "../axios";
import { Button, Form } from "react-bootstrap";

import { Image } from "../components/image";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
const Post = (props) => {
  const [post, setPost] = useState({});
  let location = useLocation();

  const pathname = location.pathname.split("/");
  const id = pathname[pathname.length - 1];

  useEffect(() => {
    axios.get("/api/post/" + id).then((res) => {
      setPost(res.data[0]);
    });
  }, [id]);

  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(
        `/api/post/${id}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${props.user.token}` } }
      );
      console.log(res);
    } catch (error) {
      console.log("Message send failed.", error);
    }
  };

  return (
    <div className="app">
      {post && Object.keys(post).length > 0 ? (
        <div>
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
            </Card.Body>
          </Card>

          <div className="comment">
            {props.user ? (
              <div>
                <Form onSubmit={handleSubmit} className="overflow-hidden mb-5">
                  <Form.Group>
                    <Form.Control
                      value={text}
                      onChange={({ target }) => setText(target.value)}
                      placeholder="Type your comment here"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    type="submit"
                    className="float-right mr-2"
                  >
                    Cancel
                  </Button>
                </Form>
              </div>
            ) : (
              <div>
                <Form className="overflow-hidden mb-5">
                  <Form.Group>
                    <Form.Control placeholder="You must be logged in to comment" />
                  </Form.Group>

                  <Link to="/login">
                    <Button
                      variant="primary"
                      type="submit"
                      className="float-right"
                    >
                      Login
                    </Button>
                  </Link>
                </Form>
              </div>
            )}

            <hr />
            {post &&
              post.comment.map((comment) => (
                <Card.Text>
                  <span>
                    <b>{comment.username}</b>
                  </span>
                  <span className="ml-3">{comment.text}</span>
                </Card.Text>
              ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export { Post };
