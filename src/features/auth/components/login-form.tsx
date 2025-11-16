"use client";

import Button from "@/src/shared/components/button";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth-store";
import { LoginInput, loginSchema } from "../validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const { login, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();

  const {
    register: loginField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    await login(data);
  };

  return (
    <>
      {!isAuthenticated ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[400px] max-w-full border border-[#515151] rounded-3xl p-4 space-y-4 flex flex-col items-center bg-[#101010]"
        >
          <h2>Войти</h2>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="emailInput" className="text-xs text-[#8e8e8e]">
              Email
            </label>
            <input
              type="text"
              id="emailInput"
              autoFocus
              autoComplete="false"
              {...loginField("email", { required: true })}
              className=" bg-[#3c3c3c] rounded-lg border border-[#515151] p-1"
            />
            {errors.email && (
              <p className=" text-wrap text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="passwordInput" className="text-xs text-[#8e8e8e]">
              Пароль
            </label>
            <input
              type="password"
              id="passwordInput"
              {...loginField("password", { required: true })}
              className="bg-[#3c3c3c] rounded-lg border border-[#515151] p-1"
            />
            {errors.password && (
              <p className=" text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit">Отправить</Button>
        </form>
      ) : (
        <div className="border border-[#515151] rounded-3xl p-4 space-y-4 flex flex-col items-center bg-[#101010]">
          <h3 className="text-center">Вы успешно авторизованы</h3>
          <div className="flex space-x-2">
            <Button href="/">На главную</Button>
          </div>
        </div>
      )}
    </>
  );
}
