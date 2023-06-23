import React from 'react';
import propTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            onClick={onClick}
            largeImage={image.largeImageURL}
            tags={image.tags}
            preview={image.webformatURL}
          />
        );
      })}
      ;
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
    images: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        webformatURL: propTypes.string.isRequired,
        tags: propTypes.string.isRequired,
        largeImageURL: propTypes.string,
      })
    ).isRequired,
    onClick: propTypes.func,
  };