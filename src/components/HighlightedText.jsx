import PropTypes from 'prop-types';

export const HighlightedText = ({ text, highlight }) => {
  if (!highlight) return <span>{text}</span>

  const regex = new RegExp(`(${highlight})`, "i")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  )
}

HighlightedText.propTypes = {
  text: PropTypes.string,
  highlight: PropTypes.string,
}