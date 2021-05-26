import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios";

const PostRanking = ({ post, user, ...props}) => {
  let history = useHistory();
  const [vote, setVote] = useState(0);

  useEffect(() => {
    setVote(post.upvote.length);
  }, [post.upvote.length]);

  const upvote = async (id, user) => {
    if (!user) {
      history.push("Login");
    }

    try {
      const res = await axios.post(
        `/api/post/${id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (res.data === 1) {
        setVote(vote + 1);
      } else {
        setVote(vote - 1);
      }
    } catch (error) {
      console.log("Message send failed.", error);
    }
  };

  return (
    <div className={props.className}>
      <button className="border-0 bg-transparent" onClick={() => upvote(post._id, user)}>
        ↑
      </button>
      <p>{vote}</p>
    </div>
  );
};

export { PostRanking }
