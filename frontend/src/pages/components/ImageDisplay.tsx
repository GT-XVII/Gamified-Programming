import React from 'react';

// component will receive a src (the image URL) 
interface ImageDisplayProps {
  src: string;
}

// Render the image
const ImageDisplay: React.FC<ImageDisplayProps> = ({ src }) => (
  <img src={src} />
);

export default ImageDisplay;
