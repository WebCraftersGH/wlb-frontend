"use client";

import Button from "@/src/shared/components/button";
import { useState } from "react";
import { wheelsCreationService } from "../services/wheels-creation-service";
import { mapFormDataToUpdateType } from "../lib/map-form-data-to-update-type";

export default function WheelsCreationForm() {
  const [rows, setRows] = useState([["", "", ""]]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isVariantSelected, setIsVariantSelected] = useState(false);

  async function initButtonClick() {
    try {
      const response = await wheelsCreationService.initWheels();
      setIsInitialized(true);
    } catch (error) {
      console.error(error);
    }
    setIsInitialized(true);
  }

  async function updateWheels() {
    try {
      const response = await wheelsCreationService.updateWheels(
        mapFormDataToUpdateType(rows, "start"),
        "start"
      );
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await wheelsCreationService.updateWheels(
        mapFormDataToUpdateType(rows, "future"),
        "future"
      );
    } catch (error) {
      console.error(error);
    }
  }

  function addRows() {
    setRows((prevRows) => [...prevRows, ["", "", ""]]);
  }

  function handleCellChange(
    rowIndex: number,
    cellIndex: number,
    value: string
  ) {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex] = [...newRows[rowIndex]];
      newRows[rowIndex][cellIndex] = value;
      return newRows;
    });
  }

  function handleVarianSelect() {
    setIsVariantSelected(true);
  }

  return (
    <>
      {isInitialized && isVariantSelected && (
        <div className="w-[500px] max-w-full border border-[#515151] rounded-3xl p-4 space-y-4 flex flex-col items-center bg-[#101010]">
          <div className="space-y-2">
            <h2>Создание колеса</h2>
            <p className="text-gray-400">
              Введите необходимые параметры для создания вашего колеса work-life
              balance. Вам нужно внести названия ключевых сфер вашей жизни (до 8
              штук), а так же их текущее и желаемое значение
            </p>
          </div>
          <table className="w-full border-[#515151] border border-collapse">
            <thead>
              <tr className=" font-semibold text-gray-200 bg-[#2d2d2d]">
                <td className="border-[#515151] border p-1">Сфера жизни</td>
                <td className="border-[#515151] border p-1">
                  Текущее значение
                </td>
                <td className="border-[#515151] border p-1">
                  Желаемое значение
                </td>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border-[#515151] border p-1">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleCellChange(rowIndex, cellIndex, e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border-[#515151] border p-1">
                  <button
                    className="text-center bg-[#2d2d2d] w-full font-semibold"
                    onClick={addRows}
                  >
                    +
                  </button>
                </td>
                <td className="border-[#515151] border p-1"></td>
                <td className="border-[#515151] border p-1"></td>
              </tr>
            </tbody>
          </table>
          <Button onClick={updateWheels}>Создать</Button>
        </div>
      )}
      {!isInitialized && (
        <div className="border border-[#515151] rounded-3xl p-4 space-y-4 flex flex-col items-center bg-[#101010]">
          <Button onClick={initButtonClick}>Начать</Button>{" "}
        </div>
      )}
      {isInitialized && !isVariantSelected && (
        <div className="border border-[#515151] rounded-3xl p-4 space-y-4 flex flex-col items-center bg-[#101010]">
          <div className="flex space-x-2">
            <Button onClick={handleVarianSelect}>Заполнить вручную</Button>
            <Button variant="secondary" disabled={true}>
              Заполнить через промт
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
