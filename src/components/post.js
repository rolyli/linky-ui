import { useState, useEffect } from "react";

import axios from "../axios";
import { Button, Form } from "react-bootstrap";
import { Image } from "./image";
import { Comment, CommentReply } from "./comment";
import { PostRanking } from "./post-ranking";
import { Link, useLocation } from "react-router-dom";

const Post = ({ user }) => {
  const [post, setPost] = useState({});
  let location = useLocation();

  const pathname = location.pathname.split("/");
  const id = pathname[pathname.length - 1];

  useEffect(() => {
    axios.get("/api/post/" + id).then((res) => {
      res.data[0].date = new Date(res.data[0].createdAt).toDateString();
      setPost(res.data[0]);
    });
  }, [id]);

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

          <div>
            {user ? (
              <div className="m-3">
                <CommentReply post_id={id} user={user} />
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
                <Comment
                  post_id={id}
                  user={user}
                  depth={0}
                  key={comment.comment_id}
                  comment={comment}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Post };
