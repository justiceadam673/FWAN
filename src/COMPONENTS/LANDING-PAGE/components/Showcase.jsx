import { Card, CardContent } from "../utility/Card";
import React from "react";

export default function Frame() {
  // Data for the images
  const images = [
    {
      src: "", // Placeholder for farm11
      alt: "Fresh herbs and greens in blue containers",
      className: "w-[200px] h-[250px]",
    },
    {
      src: "", // Placeholder for herosec3
      alt: "Fresh vegetables and carrots on wooden surface",
      className: "w-[301px] h-[300px]",
    },
    {
      src: "", // Placeholder for herosec11
      alt: "Colorful fresh vegetables",
      className: "w-[200px] h-[250px]",
    },
  ];

  // Content for the about section
  const aboutContent = {
    title: "About Us",
    paragraphs: [
      "We help smallholder farmers sell their produce faster, safely, and at fair prices.",
      "Our platform connects you directly with trusted buyers — using simple tools in your language, even on basic phones.",
      "No middlemen. No scams. Just honest trade, real offers, and mobile money payments.",
      "Grow smart. Sell fast. Earn more",
    ],
  };

  return (
    <section className='flex flex-col md:flex-row items-center justify-center gap-[60px] px-8 md:px-20 py-6 bg-[#eaeaea] w-full max-w-[1441px] mx-auto'>
      {/* Image gallery */}
      <div className='flex items-center gap-3'>
        {images.map((image, index) => (
          <Card
            key={index}
            className='rounded-[20px] overflow-hidden border-none shadow-none'
          >
            <CardContent className='p-0'>
              <div className={`relative ${image.className}`}>
                <img
                  className='w-full h-full object-cover'
                  alt={image.alt}
                  src={image.src}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About content */}
      <div className='flex flex-col items-start justify-center gap-[15px] max-w-[441px]'>
        <h2 className="w-fit [font-family:'Inter-Bold',Helvetica] font-bold text-black text-5xl">
          {aboutContent.title}
        </h2>

        <div className='flex items-center p-2.5 w-full'>
          <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-2xl">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                {index < aboutContent.paragraphs.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
