"use client";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import type { ZentInputProps } from "./input.types";

export function ZentInput({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}: ZentInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex h-14 items-center rounded-2xl border bg-white px-4 transition-all",
          error
            ? "border-red-500"
            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
        )}
      >
        {leftIcon && (
          <div className="mr-3 text-slate-500">
            {leftIcon}
          </div>
        )}

        <Input
          className={cn(
            "border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="ml-3 text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}