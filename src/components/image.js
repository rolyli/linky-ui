import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";

const Image = (props) => {
  const [src, setSrc] = useState([]);
  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  const onError = () => {
    setSrc(["/logo192.png"]);
  };

  return src.length > 1 ? (
    <Carousel interval={null}>
      {src.map((src, index) => {
        return (
          <Carousel.Item key={props.postid.concat(index)}>
            <img
              alt="Post"
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
    <img alt="Post" className="w-100 h-auto" {...props} src={src} onError={onError} />
  );
};

export { Image };
