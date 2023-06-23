import React from 'react';
import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

class Searchbar extends React.Component {
  state = {
    image: ''
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.image === '') {
      Notiflix.Notify.info('Please fill the field');
      return;
    }
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
  };
  handleInputChange = event => {
    this.setState({
      image: event.currentTarget.value.toLowerCase().trim(),
    });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.image}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
