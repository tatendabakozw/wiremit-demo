import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Assuming Next.js for routing
import { MAIN_APP } from '@/config/app_vars';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Or your preferred routing hook

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Logging in with:', { username, password });

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // On success, navigate to the app's home
            // router.push('/home');
        }, 1500);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-zinc-700 px-6'>
            <div className="w-full max-w-md bg-white border border-zinc-200/50 p-8 rounded-2xl shadow-lg">
                <h1 className="font-bold text-3xl text-zinc-900 text-center mb-2">
                    {MAIN_APP.NAME}
                </h1>
                <p className="text-center text-zinc-500 mb-8">
                    Welcome back! Please sign in to continue.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-zinc-700">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g., johndoe"
                            className="mt-1 block w-full px-4 py-3 bg-zinc-100 border border-zinc-200 rounded-lg focus:ring-zim-green-500 focus:border-zim-green-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="mt-1 block w-full px-4 py-3 bg-zinc-100 border border-zinc-200 rounded-lg focus:ring-zim-green-500 focus:border-zim-green-500"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-4 bg-zim-green-500 text-white text-lg font-bold rounded-xl transition-transform transform hover:scale-105 disabled:bg-zinc-400 disabled:scale-100 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Login'}
                    </button>
                </form>

                {/* Separator */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-zinc-200"></div>
                    <span className="flex-shrink mx-4 text-zinc-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-zinc-200"></div>
                </div>

                {/* Register Link */}
                <p className="text-center text-sm text-zinc-600">
                    Don't have an account?{' '}
                    <button
                        onClick={() => router.push('/register')}
                        className="font-semibold text-zim-green-600 hover:underline"
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
