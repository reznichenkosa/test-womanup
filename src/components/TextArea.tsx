import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import cn from "classnames";

interface TextAreaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn("border rounded-lg px-3 py-2 resize-none", className)}
      {...props}
    ></textarea>
  );
};

export default TextArea;
