import PropTypes from 'prop-types';
import { SubmitButton } from './ButtonStyles';

function Button({ onClick }) {
  return (
    <SubmitButton type="button" onClick={onClick}>
      Load more
    </SubmitButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
