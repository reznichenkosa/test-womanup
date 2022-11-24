import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input: FC<InputProps> = (props) => {
  return <input className="border rounded-lg px-3 py-2" type="text" {...props} />;
};

export default Input;
