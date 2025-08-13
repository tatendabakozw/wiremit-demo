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
    <section className="bg-zinc-50 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left column: Text content */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Welcome to <span className="text-primary-600">MizuCash</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            A financial digital platform that delivers an unmatched customer
            experience, making your money work harder for you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <PrimaryButton
              size="lg"
              className="sm:w-auto w-full"
              onClick={handleRegister}
            >
              Get Started
            </PrimaryButton>
            <PrimaryButton
              variant="outline"
              size="lg"
              className="sm:w-auto w-full"
              onClick={handleLogin}
            >
              I already have an account
            </PrimaryButton>
          </div>
        </div>

        {/* Right column: Illustration */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md lg:max-w-lg">
            <AbstractIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
