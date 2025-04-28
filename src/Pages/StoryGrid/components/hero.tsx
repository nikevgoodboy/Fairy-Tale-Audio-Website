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

export default function Hero() {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState<any[]>([]);

  const fetchFilteredStories = () => {
    fetch(
      `http://62.72.46.248:1337/api/stories?filters[title][$containsi]=${searchQuery}&populate=cover_image`
    )
      .then((response) => response.json())
      .then((data) => {
        setStories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchFilteredStories();
    }
  };

  return (
    <section>
      <div className="p-4">
        <div className="mt-4">
          {stories.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6 pt-8 pb-8">
              {stories.map((story: any) => {
                const imageUrl = story.cover_image?.url;
                const title = story.title || "Untitled";
                const description = story.description || "";
                return (
                  <div
                    className="flex flex-wrap justify-center gap-7 pt-6 pb-6 "
                    key={story.id}
                  >
                    <div className="max-w-[260px] bg-white rounded-lg shadow-lg transition-transform transform hover:scale-101 gap-4 block">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-full hover:border-blue-500 h-[210px] object-fit rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-lg font-semibold text-pink-500">
                            {title}
                          </h2>
                          <button className="flex items-center justify-center p-1 bg-gradient-to-r from-white to-pink-600 rounded-full shadow-lg hover:scale-105 transform transition-all hover:from-pink-500 hover:to-pink-500">
                            <div className="px-2 py-2 rounded-full flex items-center justify-center transition-all shadow-md bg-pink-500 hover:bg-pink-600">
                              <svg
                                className="w-4 h-4 text-white drop-shadow-sm hover:text-red-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                              </svg>
                            </div>
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center p-4 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 p-6">
        {/* Search Input */}
        <div className="w-full sm:w-auto flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full sm:w-96 px-5 py-3 rounded-full border border-pink-300 bg-pink-50 
                 text-pink-700 placeholder:text-pink-400 focus:outline-none focus:ring-2 
                 focus:ring-pink-300 transition-all shadow-sm"
          />
        </div>

        {/* Story Type Dropdown */}
        <div className="w-full sm:w-64 relative">
          <select
            className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                 px-5 py-2 shadow-lg font-[Pacifico] text-lg focus:outline-none focus:ring-4 
                 focus:ring-pink-300 transition-all appearance-none"
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
                 px-5 py-2 shadow-lg font-[Pacifico] text-lg focus:outline-none focus:ring-4 
                 focus:ring-pink-300 transition-all appearance-none"
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
      </div>
    </section>
  );
}
