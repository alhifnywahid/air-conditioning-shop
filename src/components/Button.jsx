function Button({ className, children, ...props }) {
  return (
    <button
      className={`btn bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white border-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
