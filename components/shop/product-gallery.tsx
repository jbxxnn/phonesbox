"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[]; // Array of image URLs
    mainImage?: string; // Fallback or initial main image
    title: string;
}

export function ProductGallery({ images, mainImage, title }: ProductGalleryProps) {
    // If no images array but mainImage exists, use that.
    // If images array exists, use the first one as default.
    const allImages = images.length > 0 ? images : (mainImage ? [mainImage] : []);
    const [selectedImage, setSelectedImage] = useState<string>(allImages[0] || "");

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full bg-[#f4f4f5] rounded-3xl overflow-hidden group">
                {/* Badge - Optional: Pass in as prop or context if needed, hardcoded visual for now or use logic */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-sm">
                    New Arrival
                </div>

                {/* Expand Button Visual */}
                <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-charcoal shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 15 6 6" />
                        <path d="m15 9 6-6" />
                        <path d="m9 9-6-6" />
                        <path d="m9 15-6 6" />
                    </svg>
                </button>

                <Image
                    src={selectedImage}
                    alt={title}
                    fill
                    className="object-contain p-8 mix-blend-multiply"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center md:justify-start">
                    {allImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                                "relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-[#f4f4f5] transition-all",
                                selectedImage === img
                                    ? "ring-2 ring-offset-2 ring-charcoal scale-105"
                                    : "opacity-70 hover:opacity-100 hover:scale-105"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${title} - View ${idx + 1}`}
                                fill
                                className="object-cover p-2 mix-blend-multiply"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
