import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmitHandler }) {
  const [query, setQuery] = useState('');

  const onChangeHandler = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  function onFormHandler(e) {
    e.preventDefault();

    onSubmitHandler(query);
    setQuery('');
  }

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onFormHandler.bind(this)}>
        <div className={css.wrapper}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}></span>
          </button>
          <input
            onChange={onChangeHandler}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </div>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
