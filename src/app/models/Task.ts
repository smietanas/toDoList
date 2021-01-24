export interface Task {
  _id?: string;
  name: string;
  done: boolean;
  deadline: Date;
  createDate: string;
  executeDate?: Date;
}
