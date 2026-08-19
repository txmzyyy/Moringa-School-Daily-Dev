const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  helperText,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const inputId = name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}