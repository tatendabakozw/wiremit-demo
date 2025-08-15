import AbstractIllustration from "@/components/illustrations/abstract-illustration";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/router";
import React from "react";
import PrimaryButton from "@/components/buttons/primary-button";

const Welcome = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push(ROUTES.AUTH.REGISTER);
  };

  const handleLogin = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <section className="relative bg-zinc-50 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 py-12 flex flex-col items-center">
        {/* Badge */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 mb-8">
          New & Improved
        </span>

        {/* Hero content */}
        <div className="max-w-lg mx-auto flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Welcome to <span className="text-primary-600">MizuCash</span>
          </h1>
          
          <p className="text-lg text-gray-600">
            A financial digital platform that delivers an unmatched customer
            experience, making your money work harder for you.
          </p>
        </div>

        {/* Centered and enlarged illustration */}
        <div className="">
          <AbstractIllustration />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <PrimaryButton
            size="lg"
            className="w-full"
            onClick={handleRegister}
          >
            Get Started
          </PrimaryButton>
          <PrimaryButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleLogin}
          >
            I already have an account
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Welcome;