import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shared";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
  description: "Create your HireLoop account as a job seeker or recruiter.",
};

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  );
}
