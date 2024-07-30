import { Fragment } from "react";

const Select = ({ data, title, onChange, defaultValue }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <select
        className="select select-bordered"
        onChange={onChange}
        name={title}
        defaultValue={defaultValue}
        required
      >
        {data ? (
          data.map((item) => (
            <Fragment key={item.id}>
              <option value={item.id}>{item.text}</option>
            </Fragment>
          ))
        ) : (
          <option value="none">Tunggu sebentar...</option>
        )}
      </select>
    </label>
  );
};

export default Select;
