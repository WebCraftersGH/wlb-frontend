"use client";

import Button from "@/src/shared/components/button";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  loginInput: string;
  passwordInput: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-white rounded-2xl px-2 py-4 space-y-4 flex flex-col items-center"
    >
      <h2>Войти</h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="loginInput" className="text-xs text-[#8e8e8e]">
          Логин
        </label>
        <input
          type="text"
          id="loginInput"
          {...register("loginInput", { required: true })}
          className="bg-[#3c3c3c] rounded-lg border border-[#515151] p-1"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="loginInput" className="text-xs text-[#8e8e8e]">
          Пароль
        </label>
        <input
          type="password"
          id="loginInput"
          {...register("passwordInput", { required: true })}
          className="bg-[#3c3c3c] rounded-lg border border-[#515151] p-1"
        />
      </div>
      <Button type="submit">
        Отправить
      </Button>
    </form>
  );
}
