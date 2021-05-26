import { useState, useEffect } from "react";

import axios from "../axios";
import { Button, Form } from "react-bootstrap";
import { Image } from "./image";
import { PostRanking } from "./post-ranking";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Post = ({ user }) => {
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
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(res);
    } catch (error) {
      console.log("Message send failed.", error);
    }
  };

  return (
    <div className="card-layout app mb-5">
      {Object.keys(post).length > 0 && (
        <div>
          <div className="d-flex m-0">
            <PostRanking
              className="card-ranking bg-white"
              user={user}
              post={post}
            />

            <div className="card-right w-100">
              <div className="p-0 flex-grow-1">
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
                  {post.comment_count || 0} comments
                </div>
              </div>
            </div>
          </div>

          <div className="comment-layout">
            {user ? (
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
                <div className="comment mb-2">
                  <div className="comment-username" >
                    {comment.username}
                  </div>
                  <div className="">{comment.text}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Post };
