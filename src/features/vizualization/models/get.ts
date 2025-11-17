import { IWheel } from "./wheel";

export interface IGet extends IWheel {
  createdAt: string,
  status: "start" | "run" | "future"
}