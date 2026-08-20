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
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition
          placeholder:text-gray-400
          focus:ring-2
          disabled:cursor-not-allowed disabled:bg-gray-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }
          ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;