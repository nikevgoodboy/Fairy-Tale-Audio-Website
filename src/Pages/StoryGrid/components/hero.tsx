import React, { useState, useEffect } from "react";

// Define interfaces for API response
interface StoryType {
  id: number;
  attributes: {
    name: string;
    description?: string;
    emoji?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface StoryTypeResponse {
  data: StoryType[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface HeroProps {
  onSearchQueryChange: (query: string) => void;
}

export default function Hero({ onSearchQueryChange }: HeroProps) {
  const [storyTypes, setStoryTypes] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStoryType, setSelectedStoryType] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");

  // Fetch Story Types on mount
  useEffect(() => {
    const fetchStoryTypes = async () => {
      try {
        const response = await fetch(
          "http://62.72.46.248:1337/api/story-types"
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data: StoryTypeResponse = await response.json();
        setStoryTypes(data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch story types:", err);
        setError("Failed to load story types. Please try again later.");
      }
    };

    fetchStoryTypes();
  }, []);

  const handleStoryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStoryType(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAge(e.target.value);
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchQueryChange(e.target.value); // Pass the search query to the parent (Story component)
  };

  return (
<section>
  <div className="p-4">
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 p-6">
      {/* Story Type Dropdown */}
      <div className="w-full sm:w-64 relative">
        <select
          className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                     px-5 py-2 shadow-lg font-[Pacifico] text-lg
                     focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
          value={selectedStoryType}
          onChange={handleStoryTypeChange}
          disabled={loading}
        >
          <option value="" disabled>
            🌸 Story Type
          </option>
          {loading ? (
            <option>Loading...</option>
          ) : (
            storyTypes.map((type) => {
              const attrs = type.attributes;
              if (!attrs) return null;
              return (
                <option key={type.id} value={type.id}>
                  {attrs.emoji || "✨"} {attrs.name}
                </option>
              );
            })
          )}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            className={`w-6 h-6 text-pink-500 ${
              loading ? "animate-spin" : "animate-bounce"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Age Dropdown */}
      <div className="w-full sm:w-64 relative">
        <select
          className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                     px-5 py-2 shadow-lg font-[Pacifico] text-lg
                     focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
          value={selectedAge}
          onChange={handleAgeChange}
        >
          <option value="" disabled>
            🎂 Choose Age
          </option>
          <option value="1">👶 0 - 5 years</option>
          <option value="2">🧒 6 - 10 years</option>
          <option value="3">👦 11 - 15 years</option>
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            className="w-6 h-6 text-pink-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Search Input */}
      <div className="w-full sm:w-[500px] relative">
        <input
          type="text"
          placeholder="🔍 Search stories..."
          onChange={handleSearchQueryChange}
          className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                     px-5 py-2 shadow-lg font-[Pacifico] text-lg
                     focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
        />
      </div>
    </div>
  </div>

  {/* Error */}
  {error && (
    <div className="text-center p-4 text-red-500 font-semibold">
      {error}
    </div>
  )}
</section>

  );
}
