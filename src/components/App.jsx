import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { requestPosts } from 'services/api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    modalData: null,
  });

  const handleSubmit = (inputValue) => {
    setQuery(inputValue)
    setPage(1)
  };
  const onClickLoadMore = () => {
    setPage(page + 1);

  }
  const onOpenModal = (modalData) => {
    setModal({
      isOpen: true,
      modalData: modalData,
    });
  };
  const onCloseModal = () => {
    setModal({
      isOpen: false,
      modalData: null,
    });
  };

  useEffect(() => {
    if (page === 1 && query === '') {
      return
    }
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await requestPosts(query, page);
        setPosts(prevPosts =>
          page > 1 ? [...prevPosts, ...response.hits] : response.hits
        );
      } catch (error) {
        setError(error.message);

      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts();
  }, [query, page]);
  return (
    <div>
      <Searchbar
        handleSubmit={handleSubmit}
      />
      <Loader
        loading={isLoading}
        error={error} />
      <ImageGallery
        posts={posts}
        onOpenModal={onOpenModal}
      />
      <ToastContainer />
      <Button
        onClickLoadMore={onClickLoadMore}
      />
      {modal.isOpen === true && (
        <Modal
          data={modal.modalData}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
}








