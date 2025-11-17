import { create } from "zustand";
import { IPath } from "../models/path";
import { IUpdate } from "../models/update";
import { IWheel } from "../models/wheel";
import { devtools, persist } from "zustand/middleware";
import { wheelsCreationService } from "../services/wheels-creation-service";
import { mapFormDataToUpdateType } from "../lib/map-form-data-to-update-type";

interface IWheelsState {
  wheel: IWheel | null;
  isWheelsInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  form: string[][] | null;

  initWheels: () => Promise<void>;
  updateWheels: (data: string[][], path: IPath) => Promise<void>;
  getWheels: (path: IPath) => Promise<void>;
}

export const useWheelStore = create<IWheelsState>()(
  devtools(
    persist(
      (set, get) => ({
        wheel: null,
        isWheelsInitialized: false,
        isLoading: false,
        error: null,
        form: null,

        initWheels: async () => {
          try {
            const response = await wheelsCreationService.initWheels();
            set({ isWheelsInitialized: true });
          } catch (error) {
            console.error(error);
          }
        },

        updateWheels: async (data: string[][], path: IPath) => {
          try {
            const response = await wheelsCreationService.updateWheels(
              mapFormDataToUpdateType(data, path),
              path
            );
            set({ wheel: response });
          } catch (error) {
            console.error(error);
          }
        },

        getWheels: async (path: IPath) => {
          try {
            const response = await wheelsCreationService.getWheels(path);
            set({ wheel: response });
          } catch (error) {
            console.log(error);
          }
        },
      }),
      {
        name: "wheels-store",
      }
    )
  )
);
