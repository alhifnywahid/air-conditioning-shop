function Form({ action, method, className, children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      action={action}
      method={method}
      className={`w-[75%] sm:w-[500px] xl:w-[80%] flex flex-col gap-3 ${className}`}
    >
      {children}
    </form>
  );
}

export default Form;
