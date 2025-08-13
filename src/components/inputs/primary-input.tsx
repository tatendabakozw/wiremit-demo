// src/components/PrimaryInput.tsx
import React, { forwardRef, useId, useState } from "react";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "outlined" | "soft";

export type PrimaryInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  helperText?: string;
  error?: boolean | string;
  size?: Size;
  variant?: Variant;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  containerClassName?: string;
};

const sizeMap: Record<Size, { pad: string; text: string; icon: string; radius: string }> = {
  sm: { pad: "pl-3 pr-3 py-2", text: "text-sm", icon: "h-4 w-4", radius: "rounded-lg" },
  md: { pad: "pl-3 pr-3 py-2.5", text: "text-base", icon: "h-5 w-5", radius: "rounded-xl" },
  lg: { pad: "pl-4 pr-4 py-3", text: "text-lg", icon: "h-6 w-6", radius: "rounded-2xl" },
};

const variantMap: Record<Variant, string> = {
  default:
    // white surface with subtle border; focus uses primary tokens
    "bg-white border border-gray-300 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/15",
  outlined:
    // transparent surface; stronger outline
    "bg-transparent border border-gray-400 focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-600/15",
  soft:
    // tinted surface using primary-50
    "bg-primary-50 border border-primary-100 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/15",
};

const baseInput =
  "peer block w-full bg-transparent placeholder-gray-400 text-gray-900 outline-none";

const iconBtnBase =
  "inline-flex items-center justify-center transition-colors text-gray-500 hover:text-gray-700 focus:outline-none";

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      size = "md",
      variant = "default",
      isPassword = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      containerClassName,
      disabled,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const [show, setShow] = useState(false);

    const { pad, text, icon, radius } = sizeMap[size];

    const paddingLeft = leftIcon ? "pl-2" : "";
    const paddingRight = isPassword || rightIcon ? "pr-2" : "";

    const errorRing =
      "focus-within:border-secondary-600 focus-within:ring-secondary-600/20"; // using secondary as error accent if you prefer a dedicated red, swap to your danger token.

    return (
      <div className={clsx(fullWidth && "w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              "mb-1 block font-medium",
              size === "sm" ? "text-sm" : "text-[0.95rem]",
              disabled ? "text-gray-400" : "text-gray-800"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={clsx(
            "group flex items-center transition-shadow",
            radius,
            pad,
            variantMap[variant],
            disabled && "opacity-60 cursor-not-allowed",
            error && errorRing,
            className
          )}
        >
          {leftIcon && (
            <span className={clsx("mr-2 shrink-0 text-gray-500", icon)}>{leftIcon}</span>
          )}

          <input
            id={inputId}
            ref={ref}
            type={isPassword && !show ? "password" : "text"}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={helperText ? `${inputId}-help` : undefined}
            className={clsx(
              baseInput,
              text,
              "placeholder:transition-opacity placeholder:opacity-70",
              paddingLeft,
              paddingRight
            )}
            {...rest}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className={clsx(iconBtnBase, icon, "ml-2")}
              tabIndex={-1}
            >
              {show ? <EyeSlashIcon className={icon} /> : <EyeIcon className={icon} />}
            </button>
          ) : (
            rightIcon && <span className={clsx("ml-2 shrink-0", icon)}>{rightIcon}</span>
          )}
        </div>

        {(helperText || error) && (
          <p
            id={`${inputId}-help`}
            className={clsx(
              "mt-1",
              size === "sm" ? "text-xs" : "text-sm",
              error ? "text-secondary-700" : "text-gray-500"
            )}
          >
            {typeof error === "string" ? error : helperText}
          </p>
        )}
      </div>
    );
  }
);

PrimaryInput.displayName = "PrimaryInput";
export default PrimaryInput;
