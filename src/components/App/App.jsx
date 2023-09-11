import React, { useState, useEffect } from 'react';
import { AppContainer } from './AppStyles';
import getProducts from '../../Api/Api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import ImageModal from '../Modal/Modal';
import LoadingSpinner from '../Loader/Loader';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
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

  const fetchImages = async () => {
    setIsLoading(true);

    try {
      const {
        images: fetchedImages,
        message,
        isLastPage,
      } = await getProducts(query, page);

      setImages(prevImages => [...prevImages, ...fetchedImages]);
      setError(message);
      setIsLastPage(isLastPage);
    } catch (error) {
      setError('Error fetching products. Please try again.');
    }
    setIsLoading(false);
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

  // eslint-disable-next-line no-lone-blocks
  {
    return (
      <AppContainer>
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
            {isLastPage && <Button onClick={handleLoadMore} />}
          </>
        )}
      </AppContainer>
    );
  }
}

export default App;
