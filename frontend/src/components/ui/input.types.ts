import { InputHTMLAttributes, ReactNode } from "react";

export interface ZentInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}