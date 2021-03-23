import { useState, useEffect } from "react";

import axios from "./axios";

import { Image } from "./components/image";
import { Pagination } from "./components/pagination";
import { NavbarEl } from "./components/navbar";
import { Post } from "./components/post";
import { Card } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Login, Signup } from "./pages/Login";

import "./App.css";

const Posts = (props) => {
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
    <div {...props}>
      <Pagination setPage={setPage} position="top" />

      {posts.length === 0 && (
        <div className="m-5 text-center">Oops, no more posts!</div>
      )}

      {posts.map((post) => (
        <Card key={post._id} className="mb-5">
          <Card.Header>
            <div className="overflow-auto">
              <p className="float-left">{post.username}</p>
              <p className="float-right">{post.date}</p>
            </div>
            <p>
              <b>{post.title}</b>
            </p>
          </Card.Header>

          <Image postid={post._id} src={post.attachment} />

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
  const [user, setUser] = useState("hi");
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      setUser(token);
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <NavbarEl user={user}/>
        <Switch>
          <Route exact path="/">
            <Posts className="app" />
          </Route>

          <Route path="/about">
            <About />
          </Route>
          <Route path="/post/:id" children={<Post />}></Route>
          <Route path="/login" render={(props) => <Login setUser={setUser} {...props} />}></Route>
          <Route
            path="/signup"
            render={(props) => <Signup setUser={setUser} {...props} />}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
