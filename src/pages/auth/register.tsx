import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/buttons/primary-button";
import PrimaryInput from "@/components/inputs/primary-input";
import { MAIN_APP } from "@/config/app_vars";
import { ROUTES } from "@/config/routes";

type Errors = Partial<Record<
  "firstName" | "lastName" | "email" | "username" | "password" | "confirmPassword" | "terms",
  string
>>;

function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim())  next.lastName  = "Last name is required.";
    if (!email.trim())     next.email     = "Email is required.";
    if (!password)         next.password  = "Password is required.";
    if (!confirmPassword)  next.confirmPassword = "Please confirm your password.";
    if (password && confirmPassword && password !== confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }
    if (!terms) next.terms = "You must accept the Terms & Conditions.";
    return next;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsLoading(true);
    // Simulate API
    setTimeout(() => {
      setIsLoading(false);
      // On success:
      // router.push("/welcome");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-zinc-700 px-6">
      <div className="w-full max-w-md bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-lg">
        <h1 className="font-bold text-3xl text-zinc-900 text-center mb-2">
          Create your {MAIN_APP.NAME} account
        </h1>
        <p className="text-center text-zinc-500 mb-8">
          Join us in a minute. It’s quick and easy.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PrimaryInput
              label="First name"
              placeholder="Jane"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
              variant="default"
              required
            />
            <PrimaryInput
              label="Last name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              variant="default"
              required
            />
          </div>

          <PrimaryInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            variant="default"
            required
          />

          <PrimaryInput
            label="Password"
            placeholder="At least 8 characters"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            variant="default"
            required
          />

          <PrimaryInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            isPassword
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            variant="default"
            required
          />

          {/* Terms */}
          <div className="flex items-start justify-between">
            <label className="inline-flex items-start gap-3 select-none">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-primary-600 focus:ring-primary-500 accent-primary-600"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <span className="text-sm text-zinc-700">
                I agree to the{" "}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline underline-offset-2">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-secondary-700 -mt-2">{errors.terms}</p>
          )}

          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            Create account
          </PrimaryButton>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="flex-shrink mx-4 text-zinc-400 text-sm">OR</span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        {/* Back to Login */}
        <PrimaryButton
          type="button"
          className="w-full"
          variant="secondary"
          size="lg"
          onClick={() => router.push(ROUTES.AUTH.LOGIN)}
        >
          Already have an account? Log in
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Register;
