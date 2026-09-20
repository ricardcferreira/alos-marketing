import Image from "next/image"; // 1. Import Next.js Image

interface FeatureSectionProps {
  title: string;
  description: string;
  reverse?: boolean;
  bgColor?: string;
  imageSrc: string; // 2. Add image source prop
  imageAlt?: string; // 3. Add optional alt text prop
}

export default function FeatureSection({
  title,
  description,
  reverse = false,
  bgColor = "bg-cream",
  imageSrc, // Destructure the new props
  imageAlt = "Feature image",
}: FeatureSectionProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-top gap-12 rounded-3xl ${bgColor} ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* MEDIA */}
      <div className="relative flex-1 w-full">
        <div
          aria-hidden
          className="absolute -top-8 -left-8 w-2/3 h-1/2 rounded-full"
        />
        {/* 4. Place Image inside your relative container */}
        <div className="relative rounded-3xl bg-gray-200 overflow-hidden aspect-[1/1] flex items-center justify-center">
          <Image 
            src={imageSrc} 
            alt={imageAlt} 
            fill 
            className="object-cover" 
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="flex-1 w-full p-12">
        <h1 className="font-serif text-primary-dark tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-base text-primary-dark leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}