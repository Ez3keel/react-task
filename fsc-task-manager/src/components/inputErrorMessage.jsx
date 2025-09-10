import PropTypes from 'prop-types';

const InputErrorMessage = ({ children }) => {
  return <p className='text-left text-xs text-red-500'>{children}</p>;
};

export default InputErrorMessage;

InputErrorMessage.PropTypes = {
  children: PropTypes.node.isRequired,
};
