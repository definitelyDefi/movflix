import React, {useMemo} from "react";
import classes from "./ImageGallery.module.css";
import {getImageUrl} from "../../helpers/getImage";

interface ImageItem {
  file_path: string;
  [key: string]: any;
}

interface ImageGalleryProps {
  currentContent: {
    images?: {
      posters?: ImageItem[];
      backdrops?: ImageItem[];
    };
  };
}

const getRandomImages = (imagesData: ImageGalleryProps["currentContent"]["images"], count: number): ImageItem[] => {
  if (!imagesData) return [];

  const posters = imagesData.posters || [];
  const backdrops = imagesData.backdrops || [];

  const allImages = [...posters, ...backdrops];
  const shuffledImages = allImages.sort(() => 0.5 - Math.random());

  return shuffledImages.slice(0, count);
};

const ImageGallery: React.FC<ImageGalleryProps> = ({currentContent}) => {
  const images = useMemo(() => getRandomImages(currentContent.images, 10), [currentContent.images]);

  if (!images.length) {
    return null;
  }

  const columnCount = 3;
  const columns = Array.from({length: columnCount}, () => [] as ImageItem[]);

  images.forEach((image, index) => {
    columns[index % columnCount].push(image);
  });

  return (
    <div className={classes.imageBlock}>
      {columns.map((columnImages, colIndex) => (
        <div key={colIndex} className={classes.column}>
          {columnImages.map((image, index) => (
            <div key={index} className={classes.imageItem}>
              <img src={getImageUrl(image.file_path, "w1280")} alt="Gallery" loading="lazy" className={classes.image} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
