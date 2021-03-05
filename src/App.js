import { useState, useEffect } from "react";

import axios from "./axios";

import { Image } from "./components/image";
import { Pagination } from "./components/pagination";
import { Button, Card } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "./App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
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
    <div>
      {post && Object.keys(post).length > 0 ? (
        <Card key={post._id} className="mb-5">
          <Card.Header>{post.username}</Card.Header>
          <Image postid={post._id} src={post.attachment} />

          <Card.Body style={{ opacity: 0.8 }}>
            <Card.Text className="my-1">
{post.text}
            </Card.Text>
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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(`api/posts/${page}`).then((res) => {
      res.data.forEach((post) => {
        post.date = new Date(post.createdAt).toDateString();
      });
      setPosts(res.data);
    });
  }, [page]);

  useEffect(() => {
    document.title = "Linky";
  }, []);

  return (
    <div>
      <Pagination setPage={setPage} position="top" />

      {posts.length === 0 && (
        <div className="m-5 text-center">Oops, no more posts!</div>
      )}

      {posts.map((post) => (
        <Card key={post._id} className="mb-5">
          <Card.Header>{post.username}</Card.Header>
          <Image postid={post._id} src={post.attachment} />

          <Card.Body style={{ opacity: 0.8 }}>
            <Card.Text className="my-1">
{post.text}
            </Card.Text>
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
            <Card.Text>
              <Link to={{ pathname: "/post/" + post._id }}>See full post</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

      <Pagination
        page={page}
        setPage={setPage}
        posts={posts}
        position="bottom"
      />
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
  return (
    <Router>
      <div className="App app">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>

          <Route path="/about">
            <About />
          </Route>
          <Route path="/post/:id" component={Post}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
