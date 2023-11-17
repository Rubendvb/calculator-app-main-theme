import PropTypes from 'prop-types'

export default function Button({ num, onClick }) {
  return <button onClick={onClick}>{num}</button>
}

Button.propTypes = {
  num: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
}
