import { useState } from "react";
import axios from "../axios";
import { Button, Form } from "react-bootstrap";

const CommentReply = ({
  post_id,
  user,
  comment_id,
  buttonPress,
  setButtonPress,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    comment_id
      ? axios.post(
          `/api/post/${post_id}/comment`,
          { text, comment_id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
      : axios.post(
          `/api/post/${post_id}/comment`,
          { text },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
  };

  return (
    <div className="border border-secondary p-2 rounded">
      <Form onSubmit={handleSubmit} className="overflow-hidden">
        <Form.Group>
          <Form.Control
            className="border-0"
            value={text}
            onChange={({ target }) => setText(target.value)}
            placeholder="Type your comment here"
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              setButtonPress ? setButtonPress(!buttonPress) : setText("")
            }
            className="float-right mr-2"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Comment = ({ post_id, comment, depth, user }) => {
  const [buttonPress, setButtonPress] = useState(false);

  return (
    <div className={"ml-" + depth}>
      <div className="comment-username">{comment.username}</div>
      <div className="">{comment.text}</div>

      {!buttonPress && (
        <button
          className="bold bg-white border-0 p-0 comment-item"
          onClick={() => setButtonPress(!buttonPress)}
        >
          Comment
        </button>
      )}
      {buttonPress && (
        <CommentReply
          post_id={post_id}
          user={user}
          comment_id={comment.comment_id}
          buttonPress={buttonPress}
          setButtonPress={setButtonPress}
        />
      )}
      {comment.comment &&
        comment.comment.map((c) => (
          <Comment
            post_id={post_id}
            user={user}
            key={c.comment_id}
            depth={depth + 1}
            comment={c}
          />
        ))}
    </div>
  );
};

export { Comment, CommentReply };
