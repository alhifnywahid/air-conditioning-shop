import React from "react";

const TextField = ({ title, placeholder, ...props }) => {
  // const [change, setChange] = useState("");
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <input
        data-input
        required
        type="text"
        {...props}
        // value={change}
        // onChange={(e) => setChange(e.target.value)}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </label>
  );
};

export default TextField;
