export default function Input({
  name,
  value,
  onChange,
  placeholder = "Enter something...",
  type = "text",
  required = false,
  disabled = false,
  label,
  className = '',
  ...props
}) {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-cyan-300"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
        className={`
            w-full
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `} 
      />
    </div>
  );
}
