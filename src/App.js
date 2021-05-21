import { useState, useEffect, useRef } from "react";

import axios from "./axios";

import { Image } from "./components/image";
import { NavbarEl } from "./components/navbar";
import { Post } from "./components/post";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { Login, Signup } from "./pages/Login";
import { Submit } from "./pages/Submit";

import "./App.css";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = () => {
    axios.get(`api/posts/${page}`).then((res) => {
      if (res.data.length > 0) {
        res.data.forEach((post) => {
          post.date = new Date(post.createdAt).toDateString();
        });
        setPosts(posts.concat(res.data));
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    });
  };

  const upvote = async (id) => {
    try {
      console.log(id)
      console.log(props.user.token)
      const res = await axios.post(
        `/api/post/${id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${props.user.token}` } }
      );
      console.log(res);
    } catch (error) {
      console.log("Message send failed.", error);
    }
  };

  useEffect(() => {
    axios.get(`api/posts/${page}`).then((res) => {
      res.data.forEach((post) => {
        post.date = new Date(post.createdAt).toDateString();
      });
      setPosts(res.data);
      setPage(page + 1);
    });
  }, []);

  useEffect(() => {
    document.title = "Linky";
  }, []);

  return (
    <div {...props}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>End of posts...</h4>}
        scrollThreshold={0.95}
      >
        {posts.map((post) => (
          <Card key={post._id} className="mb-5">
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
          </Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return <p className="mx-1 mt-4">Linky</p>;
};

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    console.log(document.body.clientHeight);
    console.log(window.scrollY);
    console.log(window.innerHeight);
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <NavbarEl user={user} setUser={setUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Posts className="app" user={user} />}
          ></Route>

          <Route path="/about">
            <About />
          </Route>
          <Route
            path="/post/:id"
            render={(props) => <Post user={user} />}
          ></Route>
          <Route
            path="/login"
            render={(props) => <Login setUser={setUser} {...props} />}
          ></Route>
          <Route
            path="/signup"
            render={(props) => <Signup setUser={setUser} {...props} />}
          ></Route>
          <Route
            path="/submit"
            render={(props) => <Submit user={user} />}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
