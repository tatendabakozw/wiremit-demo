import React from "react";
import clsx from "clsx";

// --- Button Style Definitions ---
const baseClasses =
  "inline-flex items-center justify-center font-semibold transition-colors " +
  "focus:outline-none disabled:opacity-50 disabled:pointer-events-none " +
  "rounded-xl text-sm";

// Variant classes aligned with your theme tokens
const variantClasses = {
  primary:
    "text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 " +
    "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  secondary:
    "text-gray-900 bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 " +
    "focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2",
  outline:
    "border border-primary-brand text-primary-brand hover:bg-primary-50 active:bg-primary-100 " +
    "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  ghost:
    "text-primary-brand hover:bg-primary-50 active:bg-primary-100 " +
    "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
} as const;

// Sizes tuned for consistent touch targets & spinner sizing
const sizeClasses = {
  sm: "h-9 px-3 rounded-lg gap-2",
  md: "h-10 px-4 py-2 gap-2",
  lg: "h-11 px-6 rounded-lg gap-2",
} as const;

// --- Loading Spinner SVG ---
const LoadingSpinner = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    className={clsx("animate-spin -ml-0.5", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

// --- Props ---
export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// --- Component ---
const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const computedClassName = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className
    );

    const spinnerSize =
      size === "sm" ? "h-4 w-4" : size === "lg" ? "h-5 w-5" : "h-5 w-5";

    return (
      <button
        ref={ref}
        className={computedClassName}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading && <LoadingSpinner className={spinnerSize} />}
        {leftIcon && !isLoading && <span className="shrink-0">{leftIcon}</span>}
        <span className="inline-flex items-center">{children}</span>
        {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
