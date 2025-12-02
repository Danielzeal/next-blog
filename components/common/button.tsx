"use client";

import { MouseEvent } from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outline,
  small,
  icon: Icon,
  className,
  type = "submit",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "text-white disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-auto border-slate-300 flex items-center justify-center gap-2 px-5 py-3 border-2 bg-slate-700",
        outline && "bg-transparent text-slate-700",
        className,
        small && "text-sm py-2 border"
      )}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;
