import React from "react";

interface ImageDisplayProps {
  src: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src }) => (
  <img src={src} alt="Content Image" className="content-image" />
);

export default ImageDisplay;
