function Input({
  type,
  placeholder,
  value,
  className,
  icon,
  onChange,
  ...props
}) {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {icon}
      <input
        type={type}
        className={`grow ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
}

export default Input;
