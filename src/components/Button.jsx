function Button({ className, children, ...props }) {
  return (
    <button
      className={`btn border-none bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
