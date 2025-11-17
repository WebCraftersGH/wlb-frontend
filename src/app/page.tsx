"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../features/auth/store/auth-store";
import { Radar } from "../features/vizualization/components/radar";
import WheelsCreationForm from "../features/vizualization/components/wheels-creation-form";
import Button from "../shared/components/button";
import { useWheelStore } from "../features/vizualization/store/wheels-store";

export default function Home() {
  const { getWheels, wheel } = useWheelStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      getWheels("start");
    }
  });

  return (
    <div className="py-4 flex flex-col justify-center items-center space-y-2">
      <h1 className="self-center justify-center">MindBridge</h1>
      {isAuthenticated ? (
        <>
          <div className="h-[500px] w-[500px] max-w-full">
            <Radar data={wheel ? wheel.peaks : []} type="startRun" />
          </div>
          {wheel ? <Button disabled={true}>Изменить</Button> : <WheelsCreationForm />}
        </>
      ) : (
        <div className="h-[500px] w-[500px] max-w-full relative">
          <div className="w-full h-full blur-xs">
            <Radar data={[]} type="startRun" />
          </div>
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center space-y-2">
            <span className="text-center">
              Авторизуйтесь для работы с&nbsp;wlb-колесом
            </span>
            <div className="flex space-x-1">
              <Button href="/registration">Регистрация</Button>
              <Button href="/login" variant="secondary">
                Войти
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
