// components/ads/sample-ad.tsx
import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/buttons/primary-button";

interface SampleAdProps {
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function SampleAd({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
}: SampleAdProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="relative text-center justify-center content-center h-36 w-full bg-zinc-200">
        <p className="text-zinc-400 text-3xl font-semibold">Ad</p>
        {/* <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        /> */}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <PrimaryButton
        //   as="a"
        //   href={ctaLink}
          size="sm"
          className="mt-3"
          variant="secondary"
        >
          {ctaText}
        </PrimaryButton>
      </div>
    </div>
  );
}
