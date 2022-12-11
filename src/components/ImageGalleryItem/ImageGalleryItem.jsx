import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  return (
    <li
      className={css.galleryItem}
      onClick={() => {
        openModal(largeImageURL);
      }}
    >
      <img className={css.galleryImage} src={webformatURL} alt={id} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  photos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
