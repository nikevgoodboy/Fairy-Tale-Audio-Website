import React, { useState } from "react";

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600); // Reset animation after it completes
  };

  return (
    <div className="w-64 sm:w-72 md:w-80 border-2 border-teal-500 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-3">
          <div className="text-white font-bold text-xl">FAIRY MAGIC</div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-pink-500 text-lg font-medium">{title}</h3>
          <button
            className="relative focus:outline-none"
            onClick={toggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
                transition-all duration-300
                ${isFavorite ? "text-pink-500" : "text-gray-700"}
                ${isAnimating ? "scale-125" : "scale-100"}
              `}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {isAnimating && isFavorite && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            )}
          </button>
        </div>
        <p className="text-gray-800 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default function Highlight() {
  const fairyTaleContent = [
    {
      title: "Discover Magic",
      description:
        "Gain access to the world's largest collection of fairy tales, with over 4000 captivating stories, including timeless classics and hidden gems.",
      imageUrl: "/api/placeholder/300/200",
    },
    {
      title: "Discover Magic",
      description:
        "Gain access to the world's largest collection of fairy tales, with over 4000 captivating stories, including timeless classics and hidden gems.",
      imageUrl: "/api/placeholder/300/200",
    },
    {
      title: "Discover Magic",
      description:
        "Gain access to the world's largest collection of fairy tales, with over 4000 captivating stories, including timeless classics and hidden gems.",
      imageUrl: "/api/placeholder/300/200",
    },
  ];

  return (
    <section className="w-full min-h-screen py-16 bg-gradient-to-b from-white to-gray-50">
      <article className="max-w-6xl mx-auto px-4">
        {/* head */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold">
            Discover <span className="text-pink-500">our content</span>
          </h1>
        </div>

        {/* Content cards */}
        <div className="flex flex-wrap justify-center gap-10">
          {fairyTaleContent.map((content, index) => (
            <ContentCard
              key={index}
              title={content.title}
              description={content.description}
              imageUrl={content.imageUrl}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
