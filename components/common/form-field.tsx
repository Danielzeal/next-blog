import { cn } from "@/lib/utils";

import {
  FieldError,
  Path,
  UseFormRegister,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disable?: boolean;
  placeholder: string;
  label?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disable,
  placeholder,
  label,
  inputClassName,
  register,
  errors,
}: FormFieldProps<T>) => {
  const fieldError = errors[id as keyof T] as FieldError | undefined;
  const message = fieldError?.message as string | undefined;

  return (
    <div>
      {label && <span className="block text-sm">{label}</span>}
      <input
        id={id}
        disabled={disable}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)}
        className={cn(
          "w-full p-3 my-2 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border border-slate-300",
          inputClassName
        )}
      />
      {message && <span className="text-rose-400 text-sm">{message}</span>}
    </div>
  );
};

export default FormField;
