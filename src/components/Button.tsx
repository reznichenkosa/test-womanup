import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...otherProps }) => {
  return (
    <button className="border flex px-3 py-2 rounded-lg w-max hover:bg-green-300" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
