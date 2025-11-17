"use client";

import { useAuthStore } from "../features/auth/store/auth-store";
import { Radar } from "../features/vizualization/components/radar";
import WheelsCreationForm from "../features/vizualization/components/wheels-creation-form";
import Button from "../shared/components/button";

export default function Home() {
  const radarData = [
    {
      id: "0",
      wheelKey: "Карьера",
      startValue: 10,
      runValue: 11,
    },
    {
      id: "1",
      wheelKey: "Здоровье",
      startValue: 5,
      runValue: 11,
    },
    {
      id: "2",
      wheelKey: "Отношения",
      startValue: 1,
      runValue: 11,
    },
    {
      id: "3",
      wheelKey: "Финансы",
      startValue: 7,
      runValue: 11,
    },
    {
      id: "4",
      wheelKey: "Развитие",
      startValue: 8,
      runValue: 11,
    },
    {
      id: "5",
      wheelKey: "Отдых",
      startValue: 10,
      runValue: 11,
    },
  ];

  const { isAuthenticated } = useAuthStore();

  return (
    <div className="py-4 flex flex-col justify-center items-center space-y-2">
      <h1 className="self-center justify-center">MindBridge</h1>
      {isAuthenticated ? (
      <>
        <div className="h-[500px] w-[500px] max-w-full">
          <Radar data={radarData} type="startRun" />
        </div>
        <WheelsCreationForm />
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
