import { IPath } from "./path";
import { IPeak } from "./peak";

export interface IWheel {
  editable: boolean;
  status: IPath;
  expires_at: string | null;
  created_at: string | null;
  peaks: IPeak[];
}
