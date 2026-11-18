"use client";

import {
  Description,
  FieldError,
  Input,
  InputGroup,
  Label,
  TextField,
  ToggleButton,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";

import {
  AuthDivider,
  AuthTabs,
  GoogleButton,
} from "@/components/auth/auth-shared";

/** Shared dark-field styling, tuned to the HireLoop purple accent. */
const fieldClassName =
  "h-11 w-full rounded-xl border-white/10 bg-white/5 px-3.5 text-base text-white placeholder:text-white/40 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus:border-[#5c53fe] [--focus:#5c53fe66]";

const groupClassName =
  "h-11 w-full rounded-xl border-white/10 bg-white/5 pr-1 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-within:border-[#5c53fe] [--focus:#5c53fe66]";

const fieldWrapperClassName = "flex flex-col gap-2 text-left";
const labelClassName = "text-sm font-medium text-white/80";
const hintClassName = "text-xs leading-relaxed text-white/40";
const errorClassName = "px-1 text-xs text-red-400";

/**
 * Sign-in form: email + password with client-side validation.
 * Collects form data for future Better Auth integration.
 */
export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log(userData);
  }

  function handleGoogle() {
    console.info("Google sign-in clicked");
  }

  return (
    <div className="w-full max-w-md">
      <AuthTabs active="sign-in" />

      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Welcome back
      </h1>

      <p className="mt-2 text-sm text-white/55">
        Sign in to continue to HireLoop.
      </p>

      <GoogleButton onClick={handleGoogle} />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          className={fieldWrapperClassName}
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className={labelClassName}>Email</Label>
          <Input
            className={fieldClassName}
            placeholder="john@example.com"
            autoComplete="email"
          />
          <FieldError className={errorClassName} />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type={showPassword ? "text" : "password"}
          className={fieldWrapperClassName}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className={labelClassName}>Password</Label>
          <InputGroup className={groupClassName}>
            <InputGroup.Input
              className="h-full flex-1 bg-transparent px-3.5 text-base text-white placeholder:text-white/40"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <InputGroup.Suffix className="pr-0">
              <ToggleButton
                isIconOnly
                size="sm"
                variant="ghost"
                isSelected={showPassword}
                onChange={setShowPassword}
                onMouseDown={(event) => event.preventDefault()}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="size-8 shrink-0 rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white data-[selected=true]:bg-transparent data-[selected=true]:text-white/70"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </ToggleButton>
            </InputGroup.Suffix>
          </InputGroup>
          <Description className={hintClassName}>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError className={errorClassName} />
        </TextField>

        {/* Forgot password */}
        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-[#8b81ff] transition-colors hover:text-[#a79dff]"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl bg-[#5c53fe] text-base font-medium text-white shadow-[0_12px_30px_-14px_#5c53fe] transition-colors hover:bg-[#6f67ff] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010103] disabled:opacity-70"
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/55">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-[#8b81ff] transition-colors hover:text-[#a79dff]"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
