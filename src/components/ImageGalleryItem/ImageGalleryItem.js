import React from 'react';
import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ preview, tags, largeImage, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={preview}
        alt={tags}
        className={css.ImageGalleryItemImg}
        onClick={() => {
          onClick(largeImage);
        }}
      />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
  onClick: propTypes.func,
};
