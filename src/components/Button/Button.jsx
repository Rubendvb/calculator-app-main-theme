import PropTypes from 'prop-types'

import './Button.scss'

export default function Button({ num, onClick }) {
  return (
    <button
      className={`button ${
        num === '='
          ? 'equal'
          : num === '+'
          ? 'plus'
          : num === '-'
          ? 'minus'
          : num === '.'
          ? 'dot'
          : num === 'x'
          ? 'times'
          : num
      }`}
      onClick={onClick}
    >
      {num}
    </button>
  )
}

Button.propTypes = {
  num: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
}
