import { IPath } from "../models/path";
import { IPeak } from "../models/peak";
import { IUpdate } from "../models/update";

export function mapFormDataToUpdateType(
  data: string[][],
  path: IPath
): IUpdate {
  const peaks: IPeak[] = [];

  if (path === "start") {
    data.map((wheelKey) => {
      peaks.push({
        wheel_key: wheelKey[0],
        value: Number(wheelKey[1]),
        run_value: Number(wheelKey[1]),
      });
    });
  } else if (path === "run") {
    data.map((wheelKey) => {
      peaks.push({
        wheel_key: wheelKey[0],
        value: Number(wheelKey[1]),
        run_value: Number(wheelKey[1]),
      });
    });
  } else if (path === "future") {
    data.map((wheelKey) => {
      peaks.push({
        wheel_key: wheelKey[0],
        value: Number(wheelKey[2]),
        run_value: Number(wheelKey[1]),
      });
    });
  }

  return {
    editable: path === "start" ? false : true,
    expires_at: path === "future" ? "2025-12-31T23:59:59Z" : null,
    peaks: [...peaks],
  };
}
