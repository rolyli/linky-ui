import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "../axios";

const Submit = (props) => {
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/post`,
        { text, attachment, title },
        { headers: { Authorization: `Bearer ${props.user.token}` } }
      );
      console.log(res);
    } catch (error) {
      console.log("Message send failed.", error);
    }
  };

  return (
    <div className="app login">
      <h2>Make a new post</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            value={attachment}
            onChange={({ target }) => setAttachment(target.value)}
            placeholder="Attachment URL"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            value={text}
            onChange={({ target }) => setText(target.value)}
            className="submit"
            placeholder="Text"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export { Submit };
