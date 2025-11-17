import { IUpdate } from "./update";

export interface IGet extends IUpdate {
  createdAt: string,
  status: "start" | "run" | "future"
}