import '../../styles.css';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ currentImage, closeModal }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const closeByEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  return (
    <div
      onClick={e => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      className="Overlay"
    >
      <div className="Modal">
        <img width="600" src={currentImage} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  currentImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
