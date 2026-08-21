const CategoryChip = ({
  children,
  label,
  active = false,
  onClick,
  className = "",
}) => {
  const content = children || label;

  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors";

  const stateStyles = active
    ? "bg-blue-600 text-white"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseStyles} ${stateStyles} ${className}`}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={`${baseStyles} ${stateStyles} ${className}`}>
      {content}
    </span>
  );
};

export default CategoryChip;