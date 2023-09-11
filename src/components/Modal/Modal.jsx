import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContent, ModalImg } from './ModalStyles';

function ImageModal({ isOpen, imageUrl, onClose }) {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleBackdropClick}>
          <ModalContent>
            <ModalImg src={imageUrl} alt="Large" />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
