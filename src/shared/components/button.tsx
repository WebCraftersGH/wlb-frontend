import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { IButtonVariant } from "../models/button-variant";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IButtonVariant;
  href?: string;
  children: ReactNode;
}

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: IButtonProps) {
  const baseClasses =
    "py-2 px-3 rounded-lg cursor-pointer font-family-hikasami transition-colors duration-200 ease-in-out";
  const varianClasses: Record<IButtonVariant, string> = {
    primary: "bg-white text-black hover:bg-[#C0C0C0] active:bg-[#CCCCCC]",
    secondary:
      "bg-black border-white border text-white hover:bg-[#1B1B1B] active:bg-[#0B0B0B]",
  };
  if (href) {
    switch (variant) {
      case "primary":
        return (
          <Link
            href={href}
            className={`block w-fit ${baseClasses} ${varianClasses.primary} ${className}`}
          >
            {children}
          </Link>
        );
      case "secondary":
        return (
          <Link
            href={href}
            className={`block w-fit ${baseClasses} ${varianClasses.secondary} ${className}`}
          >
            {children}
          </Link>
        );
    }
  } else {
    switch (variant) {
      case "primary":
        return (
          <button
            className={`${baseClasses} ${varianClasses.primary} ${className}`}
            {...props}
          >
            {children}
          </button>
        );
      case "secondary":
        return (
          <button
            className={`${baseClasses} ${varianClasses.secondary} ${className}`}
            {...props}
          >
            {children}
          </button>
        );
    }
  }
}
