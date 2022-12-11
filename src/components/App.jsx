import '../styles.css';
import { useState, useEffect } from 'react';
import { fetchFunction } from 'services/photosApi';
import { mapped } from 'services/mapped';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading({ loading: true });
    fetchFunction(query, page)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(new Error('error'));
        } else {
          return res.json();
        }
      })
      .then(res => {
        if (res.hits.length === 0) {
          Notiflix.Notify.warning('Invalid request');
          return;
        }
        setPhotos(prev => [...prev, ...mapped(res.hits)]);
        setTotalHits(res.totalHits);
      })
      .catch(error => {
        Notiflix.Notify.failure('Error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const onSubmit = photoName => {
    if (photoName.trim() === '') {
      Notiflix.Notify.warning('Empty string');
      return;
    }

    setPhotos([]);
    setQuery(photoName);
    setPage(1);
    setTotalHits(0);
    setCurrentImage(null);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = image => {
    setCurrentImage(image);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <Searchbar onSubmitHandler={onSubmit} />
      {loading && <Loader />}
      {photos.length > 0 && (
        <ImageGallery
          photos={photos}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {photos.length > 0 && page * 12 < totalHits && (
        <Button text="Load more" onLoadMore={onLoadMore} />
      )}

      {currentImage && (
        <Modal currentImage={currentImage} closeModal={closeModal} />
      )}
    </>
  );
};
