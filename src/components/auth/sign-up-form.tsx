"use client";

import {
  Description,
  FieldError,
  Input,
  InputGroup,
  Label,
  ListBox,
  Select,
  TextField,
  ToggleButton,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";

import {
  AuthDivider,
  AuthTabs,
  GoogleButton,
} from "@/components/auth/auth-shared";
import { signIn, signUp } from "@/lib/auth-client";

/** Shared dark-field styling, tuned to the HireLoop purple accent. */
const fieldClassName =
  "h-11 w-full rounded-xl border-white/10 bg-white/5 px-3.5 text-base text-white placeholder:text-white/40 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus:border-[#5c53fe] [--focus:#5c53fe66]";

const groupClassName =
  "h-11 w-full rounded-xl border-white/10 bg-white/5 pr-1 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-within:border-[#5c53fe] [--focus:#5c53fe66]";

const fieldWrapperClassName = "flex flex-col gap-2 text-left";
const labelClassName = "text-sm font-medium text-white/80";
const hintClassName = "text-xs leading-relaxed text-white/40";
const errorClassName = "px-1 text-xs text-red-400";

const selectTriggerClassName =
  "h-11 w-full rounded-xl border-white/10 bg-white/5 px-3.5 text-base text-white transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:border-[#5c53fe] [--focus:#5c53fe66]";

const ROLES = [
  { value: "user", label: "Job Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const;

type Role = (typeof ROLES)[number]["value"];

/**
 * Sign-up form: name, email, role and password with client-side validation.
 * Creates the account with Better Auth, including the selected role.
 */
export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("user");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { data, error } = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role,
    });

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      router.push("/");
    }
  }

  async function handleGoogle() {
    await signIn.social({
      provider: "google",
    });
  }

  return (
    <div className="w-full max-w-md">
      <AuthTabs active="sign-up" />

      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-white/55">
        Start your journey with HireLoop — it only takes a minute.
      </p>

      <GoogleButton onClick={handleGoogle} />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <TextField
          isRequired
          name="name"
          className={fieldWrapperClassName}
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label className={labelClassName}>Name</Label>
          <Input
            className={fieldClassName}
            placeholder="Enter your name"
            autoComplete="name"
          />
          <FieldError className={errorClassName} />
        </TextField>

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

        {/* Role */}
        <Select
          className={fieldWrapperClassName}
          selectedKey={role}
          onSelectionChange={(key) => key && setRole(key as Role)}
        >
          <Label className={labelClassName}>Role</Label>
          <Select.Trigger className={selectTriggerClassName}>
            <Select.Value />
            <Select.Indicator className="size-4 text-white/40" />
          </Select.Trigger>
          <Select.Popover className="min-w-[var(--trigger-width)] rounded-xl border border-white/10 bg-[#0b0b12] p-1 shadow-2xl">
            <ListBox>
              {ROLES.map((option) => (
                <ListBox.Item
                  key={option.value}
                  id={option.value}
                  textValue={option.label}
                  className="rounded-lg px-2.5 py-2 text-sm text-white/80 outline-none data-[focused=true]:bg-white/10 data-[focused=true]:text-white data-[selected=true]:text-white"
                >
                  {option.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <Description className={hintClassName}>
            Choose how you want to use HireLoop.
          </Description>
          <FieldError className={errorClassName} />
        </Select>

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
              autoComplete="new-password"
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

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 h-11 w-full rounded-xl bg-[#5c53fe] text-base font-medium text-white shadow-[0_12px_30px_-14px_#5c53fe] transition-colors hover:bg-[#6f67ff] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010103] disabled:opacity-70"
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/55">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[#8b81ff] transition-colors hover:text-[#a79dff]"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
