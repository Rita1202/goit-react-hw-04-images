import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, onLoadMore }) => {
  return (
    <button className={css.button} onClick={onLoadMore} type="button">
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
