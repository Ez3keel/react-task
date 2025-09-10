import PropTypes from 'prop-types';

export default function Header(props) {
  return <h1 className="header">{props.children}</h1>;
}

Header.PropTypes = {
  children: PropTypes.node.isRequired,
}