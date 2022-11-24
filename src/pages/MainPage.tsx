import { FC, useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { IFile, ITodo } from "../types/todo.interface";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const MainPage: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addTodo = async (data: Omit<ITodo, "id">) => {
    await addDoc(collection(db, "todos"), data);
  };

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res: ITodo[] = [];
      querySnapshot.forEach((doc) => {
        res.push({ ...doc.data(), id: doc.id } as ITodo);
      });
      setTodos(
        res.sort((a, b) => {
          if (a.isCompleted === b.isCompleted) {
            return b.createdAt - a.createdAt;
          } else {
            return +a.isCompleted - +b.isCompleted;
          }
        })
      );
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleCompleteHandler = async (todo: ITodo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };

  const deleteTodo = async (todo: ITodo) => {
    if (window.confirm("Do you want to delete this task?")) {
      for (const file of todo.files) {
        await deleteObject(ref(storage, "files/" + file.name));
      }
      await deleteDoc(doc(db, "todos", todo.id));
    }
  };

  const uploadFiles = async (files: File[]): Promise<IFile[]> => {
    const res: IFile[] = [];

    for (const file of files) {
      const fileRef = ref(storage, "files/" + Date.now() + "_" + file.name);
      const data = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(data.ref);
      res.push({
        url,
        type: data.metadata.contentType || "file",
        name: data.metadata.name,
      });
    }
    return res;
  };

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-5 items-center justify-center">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <TodoForm addTodo={addTodo} uploadFiles={uploadFiles} />
          <TodoList deleteTodo={deleteTodo} toggleComplete={toggleCompleteHandler} todos={todos} />
        </>
      )}
    </div>
  );
};

export default MainPage;
