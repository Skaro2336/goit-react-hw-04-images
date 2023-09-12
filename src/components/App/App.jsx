import React, { useState, useEffect } from 'react';
import { AppContainer } from './AppStyles';
import getProducts from '../../Api/Api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import ImageModal from '../Modal/Modal';
import LoadingSpinner from '../Loader/Loader';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    async function fetchImages() {
      if (!query) {
        return;
      }

      setIsLoading(true);

      try {
        const {
          images: fetchedImages,
          message,
          isLastPage,
        } = await getProducts(query, page);

        setImages(prevImages => [...prevImages, ...fetchedImages]);

        if (message) {
          setError(message);
          toast.error(message);
        } else {
          setError(null);
        }

        setIsLastPage(isLastPage);
      } catch (error) {
        setError('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');
      }

      setIsLoading(false);
    }

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setIsLoading(true);
    setError(null);
    setPage(1);
    setIsLastPage(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = selectedImage => {
    setSelectedImage(selectedImage);
    setShowModal(true);
  };

  const closeImageModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <AppContainer>
      <ToastContainer />

      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {showModal && (
            <ImageModal
              isOpen={showModal}
              imageUrl={selectedImage}
              onClose={closeImageModal}
            />
          )}
          {!error && isLastPage && <Button onClick={handleLoadMore} />}
        </>
      )}
    </AppContainer>
  );
}

export default App;
