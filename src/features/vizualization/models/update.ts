import { IPeak } from "./peak";

export interface IUpdate {
  editable: boolean;
  expires_at: string;
  peaks: IPeak[];
}
