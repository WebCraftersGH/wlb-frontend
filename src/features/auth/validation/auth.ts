import { z } from 'zod'

export const registerSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'Пароль должен содержать буквы в верхнем и нижнем регистре и цифры'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>