import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";

interface CardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  link?: string;
  url: string;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const CardComponent: React.FC<CardProps> = ({
  id,
  title,
  description,
  url,
  alt,
  link,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="max-w-[260px] bg-white rounded-lg shadow-lg transition-transform transform hover:scale-101 gap-4">
      <Link to={link || "/StoryDetail"}>
        <div className="relative">
          <img
            src={url}
            alt={alt}
            className="w-full hover:border-blue-500 h-[210px] object-fit rounded-t-lg"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-pink-500">{title}</h2>
          <button
            onClick={() => onToggleFavorite(id)}
            className="p-1 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <svg
              className={`w-5 h-5 ${
                isFavorite ? "text-red-600" : "text-gray-400"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface StoryProps {
  stories: Array<{
    id: number;
    title: string;
    description: string;
    cover_image?: { url: string; alt: string };
  }>;
}

const Card: React.FC<StoryProps> = ({ stories }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Fetch favorite story IDs
  useEffect(() => {
    fetch("http://62.72.46.248:1337/api/story-favorites")
      .then((res) => res.json())
      .then((data) => {
        const favIds = data.data.map(
          (fav: any) => fav.attributes.story.data.id
        );
        setFavorites(favIds);
      })
      .catch((error) => console.error("Failed to load favorites:", error));
  }, []);

  // Toggle favorite status
  const handleToggleFavorite = (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    // Optionally: Send POST/DELETE request to update the backend
    // This part depends on your API auth rules & implementation
  };

  return (
    <div className="flex flex-wrap justify-center gap-7 pt-6 pb-6">
      {stories.map((story) => (
        <CardComponent
          key={story.id}
          id={story.id}
          title={story.title}
          description={story.description}
          url={
            story.cover_image?.url ||
            "https://res.cloudinary.com/dsfuhhdez/image/upload/v1745376147/three_little_pigs_4740ba3915.webp"
          }
          alt={story.cover_image?.alt || "Story Image"}
          link={`/StoryDetail/${story.id}`}
          isFavorite={favorites.includes(story.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
};

export default Card;
