import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/buttons/primary-button";
import PrimaryInput from "@/components/inputs/primary-input";
import { MAIN_APP } from "@/config/app_vars";
import { ROUTES } from "@/config/routes";
import { login } from "@/services/auth.service";
import { useToast } from "@/hooks/useToast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const { addToast } = useToast()


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);
    try {
      setIsLoading(true);
      await login({ email, password, rememberMe });
      addToast({
        title: 'Login successful',
        message: "User loged in sucessfully. Enjoy your stay!",
        type: 'success',
        duration: 4000,
      });
      router.push(ROUTES.PORTAL.HOME);
    } catch (err: any) {
      addToast({
        title: 'Failed to register',
        message: err.response?.data || err.message || "Failed to login, Please try again",
        type: 'error',
        duration: 4000,
      });
      console.error(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-zinc-700 px-6">
      <div className="w-full max-w-md bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-lg">
        <h1 className="font-bold text-3xl text-zinc-900 text-center mb-2">
          {MAIN_APP.NAME}
        </h1>
        <p className="text-center text-zinc-500 mb-8 ">
          Welcome back! Please sign in to continue.
        </p>

        {/* Top-level error */}
        {formError && (
          <div className="mb-4 rounded-lg border border-secondary-500/30 bg-secondary-50 px-4 py-3 text-sm text-secondary-800">
            {formError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <PrimaryInput
            label="Email"
            placeholder="e.g., name@example.com"
            type="email"
            variant="default"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <PrimaryInput
            label="Password"
            placeholder="••••••••"
            variant="default"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
            required
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-primary-600 focus:ring-primary-500 accent-primary-600"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-sm text-zinc-700">Remember me</span>
            </label>

            <Link
              href={ROUTES?.AUTH?.FORGOT_PASSWORD || "/forgot-password"}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            Login
          </PrimaryButton>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="flex-shrink mx-4 text-zinc-400 text-sm">OR</span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        {/* Register Link */}
        <PrimaryButton
          type="button"
          isLoading={isLoading}
          className="w-full"
          variant="secondary"
          size="lg"
          onClick={() => router.push(ROUTES.AUTH.REGISTER)}
        >
          Register Instead
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Login;
