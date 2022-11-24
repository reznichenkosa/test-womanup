import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { ITodo } from "../types/todo.interface";
import TodoItem from "./TodoItem";

interface TodoListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  todos: ITodo[];
  deleteTodo: (todo: ITodo) => void;
  toggleComplete: (todo: ITodo) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, deleteTodo, toggleComplete, ...otherProps }) => {
  return (
    <div
      {...otherProps}
      className="h-max p-3 bg-white w-full rounded-xl shadow-md flex flex-col gap-3"
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          todo={todo}
        />
      ))}
      {(todos.length === 0 || !todos) && (
        <div className="flex justify-center py-4">There aren't any tasks</div>
      )}
    </div>
  );
};

export default TodoList;
