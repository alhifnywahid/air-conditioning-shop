function Form({ action, method, className, children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      action={action}
      method={method}
      className={`flex w-[75%] flex-col gap-3 sm:w-[500px] xl:w-[80%] ${className}`}
    >
      {children}
    </form>
  );
}

export default Form;
