import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { Image } from "./image";
import { BrowserRouter as  Link } from "react-router-dom";

const PostCard = ({post, upvote}) => {
  <Card className="mb-5">
    <Container className="p-0 m-0">
      <Row>
        <Col xs={1} className="card-ranking">
          <button onClick={() => upvote(post._id)}>hi</button>
          <p>{post.upvote.length}</p>
        </Col>
        <Col xs={11} className="p-0">
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
        </Col>
      </Row>
    </Container>
  </Card>;
};

export { PostCard }