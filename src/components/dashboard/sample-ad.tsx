import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PrimaryButton from "@/components/buttons/primary-button";

interface SampleAdProps {
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const SampleAd = ({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
}: SampleAdProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-full">
      <div className="relative text-center justify-center content-center h-36 w-full bg-zinc-200">
        <p className="text-zinc-400 text-3xl font-semibold">Ad</p>
        {/* <Image src={imageUrl} alt={title} fill className="object-cover" /> */}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <PrimaryButton
          size="sm"
          className="mt-3"
          variant="secondary"
        >
          {ctaText}
        </PrimaryButton>
      </div>
    </div>
  );
};

const AdCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample ad data
  const ads = [
    {
      imageUrl: "/ad1.jpg",
      title: "Special Offer!",
      description: "Get 20% off your first purchase with code WELCOME20",
      ctaText: "Shop Now",
      ctaLink: "#"
    },
    {
      imageUrl: "/ad2.jpg",
      title: "New Collection",
      description: "Discover our latest products for the season",
      ctaText: "Explore",
      ctaLink: "#"
    }
  ];

  // Auto-rotate ads every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="relative w-full max-w-md mx-auto h-80 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <SampleAd {...ads[currentIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${currentIndex === index ? 'bg-primary-500' : 'bg-gray-300'}`}
            aria-label={`Go to ad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;