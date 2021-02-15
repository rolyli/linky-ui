import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

const TwitterImage = (props) => {
  const [srcs, setSrcs] = useState([]);
  useEffect(() => {
    setSrcs(props.src);
  }, []);

  const onError = () => {
    setSrcs("/logo192.png");
  };

  return srcs.length > 1 ? (
    <Carousel interval={null}>
      {srcs.map((src, index) => {
        return (
          <Carousel.Item key={props.postid.concat(index)}>
            <img
              className="w-100 h-auto" 
              {...props}
              src={src}
              onError={onError}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  ) : (
    <img className="w-100 h-auto" {...props} src={srcs[0]} onError={onError} />
  );
};

export { TwitterImage };
