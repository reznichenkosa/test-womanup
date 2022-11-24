export interface ITodo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: number;
  files: IFile[];
}

export interface IFile {
  name: string;
  type: string;
  url: string;
}
