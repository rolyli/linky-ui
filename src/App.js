import { useState, useEffect } from "react";

import axios from "./axios";
import { PostCard } from "./components/post-card";
import { NavbarEl } from "./components/navbar";
import { Post } from "./components/post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  useEffect(() => {
    document.title = "Linky";
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div key={post._id} className="mb-5">
            <PostCard key={post._id} post={post} user={props.user}></PostCard>
          </div>
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
