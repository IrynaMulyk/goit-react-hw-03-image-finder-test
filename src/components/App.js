import React from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Spiner';
import css from './App.module.css';
import { fetchImages, PER_PAGE } from './Api/Api';

class App extends React.Component {
  state = {
    image: '',
    largeImage: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    showModal: false,
    currentImgPerPage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.image !== this.state.image) {
      this.getImagesData();
    }

    if (this.state.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onSubmitForm = image => {
    this.setState(() => {
      return { image: image, page: 1, images: [] };
    });
  };
  
  handleLoadMoreImg = () => {
    this.getImagesData();
  };

  getImagesData = async () => {
    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchImages(
        this.state.page,
        this.state.image
      );
      if (totalHits === 0) {
        Notiflix.Notify.info('There are no images');
        this.setState({ loading: false, currentImgPerPage: null });
        return;
      }

      const images = this.imagesList(hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          currentImgPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  imagesList = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };
toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = largeImage => {
    this.setState({ largeImage }, () => {
      this.toggleModal();
    });
  };
  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmitForm} />
        {this.state.images.length > 0 && !this.state.error && (
          <div>
            <ImageGallery images={this.state.images} onClick={this.openModal} />
            {this.state.currentImgPerPage && this.state.currentImgPerPage < PER_PAGE && (
              <p>There is no more pictures</p>
            )}
          </div>
        )}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImage} alt="" />
          </Modal>
        )}
        {this.state.currentImgPerPage === PER_PAGE && !this.state.loading && (
          <Button onClick={this.handleLoadMoreImg} />
        )}
        {this.state.loading && <Loader />}
      </div>
    );
  }
}

export default App;
