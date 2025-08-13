import AbstractIllustration from '@/components/illustrations/abstract-illustration';
import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/router';
import React from 'react';

const Welcome = () => {

  const router = useRouter()

  const handleRegister = () => {
    router.push(ROUTES.AUTH.REGISTER);
  };

  const handleLogin = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <div className="bg-zinc-50 min-h-screen px-6 flex flex-col items-center justify-center">
      <div className="rounded-full">
        <AbstractIllustration />
      </div>
      <div className="flex flex-col gap-4 items-center w-full max-w-sm pt-8">
        <h1 className="text-4xl text-zinc-950 font-black">
          MizuCash
        </h1>
        <p className="text-zinc-700 text-lg text-center">
          Financial digital platform that provides unmatched customer experience for its clients.
        </p>
        <div className="h-4" />
        <button
          onClick={handleRegister}
          className="bg-blue-600 w-full p-4 rounded-2xl text-white text-lg font-bold transition-transform transform hover:scale-105"
        >
          Get Started
        </button>
        <button
          onClick={handleLogin}
          className="bg-white border border-zinc-200/50 w-full p-4 rounded-2xl text-zinc-950 text-lg font-bold transition-colors hover:bg-zinc-100"
        >
          I already have an account
        </button>
      </div>
    </div>
  );
};

export default Welcome;
