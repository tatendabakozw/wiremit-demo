import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/buttons/primary-button";
import PrimaryInput from "@/components/inputs/primary-input";
import { MAIN_APP } from "@/config/app_vars";
import { ROUTES } from "@/config/routes";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        console.log("Logging in with:", { email, password, rememberMe });

        setTimeout(() => {
            setIsLoading(false);
            // router.push('/home');
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-zinc-700 px-6">
            <div className="w-full max-w-md bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-lg">
                <h1 className="font-bold text-3xl text-zinc-900 text-center mb-2">
                    {MAIN_APP.NAME}
                </h1>
                <p className="text-center text-zinc-500 mb-8 ">
                    Welcome back! Please sign in to continue.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Username Input */}
                    <PrimaryInput
                        label="Email"
                        placeholder="e.g., name@example.com"
                        variant="default"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password Input */}
                    <PrimaryInput
                        label="Password"
                        placeholder="••••••••"
                        variant="default"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isPassword
                        required
                    />

                    {/* Remember + Forgot row */}
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
                            href="/forgot-password"
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
