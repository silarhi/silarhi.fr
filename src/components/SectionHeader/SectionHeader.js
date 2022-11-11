import PropTypes from "prop-types"

export default function SectionHeader({title, subtitle}) {
  return (
    <div className={"mt-4 mb-5 text-center"}>
      <h2>{title}</h2>
      {subtitle && <p className={"text-muted"}>{subtitle}</p>}
    </div>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}
