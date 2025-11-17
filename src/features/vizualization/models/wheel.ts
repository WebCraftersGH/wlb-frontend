import { IPeak } from "./peak";

export interface IWheel {
  editable: boolean;
  expires_at: string | null;
  peaks: IPeak[];
}
