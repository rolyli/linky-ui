const Pagination = ({ posts, page, setPage, position, style, className }) => {
  if (position === "top") {
    return (
      <div className={className} style={{overflow: "auto", ...style}} >
        <div>
            <p
              className="float-right"
              onClick={() => {
                window.scrollTo(0, 0);
                setPage(0);
              }}
            >
              <u style={{cursor: "pointer"}}>Latest page</u>
            </p>
        </div>
        <br />
      </div>
    );
  }

  if (position === "bottom") {
    return (
      <div className={className} style={{overflow: "auto", ...style}}>
        <div>
          {page !== 0 && (
            <p
              className="float-left"
              onClick={() => {
                if (page !== 0) {
                  setPage(page - 1);
                }
              }}
            >
              <u style={{cursor: "pointer"}}>Newer posts</u>
            </p>
          )}

          {posts.length !== 0 && (
            <p
              className="float-right"
              onClick={() => {
                window.scrollTo(0, 0);
                setPage(page + 1);
              }}
            >
              <u style={{cursor: "pointer"}}>Older posts</u>
            </p>
          )}
        </div>
        <br />
      </div>
    );
  }
};

export { Pagination };
