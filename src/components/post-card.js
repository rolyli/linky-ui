import { Image } from "./image";
import { Link } from "react-router-dom";
import { PostRanking } from "../components/post-ranking";

const PostCard = ({ post, user }, props) => {
  return (
    <div {...props} className="card-layout d-flex">
      <PostRanking className="card-ranking" post={post} user={user} />

      <div className="card-right w-100">
        <div className="card-bottom p-0 flex-grow-1">
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
            <Link to={{ pathname: "/post/" + post._id }}>
              See all {post.comment_count} comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostCard };
