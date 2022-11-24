import { ChangeEvent, DetailedHTMLProps, FC, FormEvent, FormHTMLAttributes, useState } from "react";
import { IFile, ITodo } from "../types/todo.interface";
import Button from "./Button";
import FileItem from "./FileItem";
import Input from "./Input";
import InputFile from "./InputFile";
import TextArea from "./TextArea";
import cn from "classnames";

interface TodoFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  addTodo: (data: Omit<ITodo, "id">) => void;
  uploadFiles: (files: File[]) => Promise<IFile[]>;
}

const initialFormState: Omit<ITodo, "id" | "date" | "files"> = {
  title: "",
  deadline: "",
  description: "",
  isCompleted: false,
  createdAt: 0,
};

const TodoForm: FC<TodoFormProps> = ({ addTodo, uploadFiles, ...props }) => {
  const [formData, setFormData] = useState<Omit<ITodo, "id" | "date" | "files">>(initialFormState);
  const [files, setFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    const response = await uploadFiles(files);
    addTodo({
      ...formData,
      files: response,
      createdAt: Date.now(),
    });
    setFormData(initialFormState);
    setFiles([]);
    setIsSending(false);
  };
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      {...props}
      className={cn("h-max p-3 bg-white w-full rounded-xl shadow-md flex flex-col gap-2", {
        "opacity-50": isSending,
      })}
    >
      <Input
        required
        onChange={inputChangeHandler}
        value={formData.title}
        name="title"
        placeholder="Title"
      />
      <div className="flex gap-2">
        <TextArea
          required
          onChange={inputChangeHandler}
          value={formData.description}
          name="description"
          placeholder="Description"
          className="flex-1"
        />
        <InputFile onChange={changeFileHandler} multiple />
      </div>
      <div className="flex gap-2">
        {files.map((file) => (
          <FileItem file={file} key={file.name + file.size} />
        ))}
      </div>
      Deadline:
      <Input
        required
        onChange={inputChangeHandler}
        value={formData.deadline}
        name="deadline"
        type="date"
      />
      <Button disabled={isSending}>{isSending ? "Sending..." : "Add todo"}</Button>
    </form>
  );
};

export default TodoForm;
