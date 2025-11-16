"use client";

import Button from "@/src/shared/components/button";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth-store";
import { RegisterInput, registerSchema } from "../validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const { register, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  //TODO: Заменить отправку всей даты с регистрации на отправку {email: email, password: password}

  const onSubmit = async (data: RegisterInput) => {
    await register(data);
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
              {...registerField("email", { required: true })}
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
              {...registerField("password", { required: true })}
              className="bg-[#3c3c3c] rounded-lg border border-[#515151] p-1"
            />
            {errors.password && (
              <p className=" text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label htmlFor="confirmPasswordInput" className="text-xs text-[#8e8e8e]">
              Подтверждение пароля
            </label>
            <input
              type="password"
              id="confirmPasswordInput"
              {...registerField("confirmPassword", { required: true })}
              className="bg-[#3c3c3c] rounded-lg border border-[#515151] p-1"
            />
            {errors.password && (
              <p className=" text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
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
