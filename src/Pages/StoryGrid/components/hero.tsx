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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStoryType, setSelectedStoryType] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");

  useEffect(() => {
    // Fetch story types from API
    const fetchStoryTypes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://62.72.46.248:1337/api/story-types"
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: StoryTypeResponse = await response.json();
        setStoryTypes(data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch story types:", err);
        setError("Failed to load story types. Please try again later.");
      } finally {
        setLoading(false);
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

  return (
    <section>
      <div className="from-teal-100 to-lime-100 p-8 rounded-lg">
        <div className="text-center shadow-lg">
          <h1 className="text-5xl font-extrabold text-withe mb-2">
            FAIRY TALES
          </h1>
          <h1 className="text-3xl font-semibold text-pink-600 mb-4">
            Tales for Young
          </h1>
        </div>
      </div>

      {error && <div className="text-center p-4 text-red-500">{error}</div>}

      <div className="flex flex-col-12 sm:flex-row justify-center p-3 gap-5">
        {/* Story Type Dropdown */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <select
              className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                            px-5 py-2 shadow-lg font-[Pacifico] text-lg
                            focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
              value={selectedStoryType}
              onChange={handleStoryTypeChange}
              disabled={loading}
            >
              <option value="" disabled>
                🌸 Story Type 🌸
              </option>
              {loading ? (
                <option>Loading story types...</option>
              ) : (
                storyTypes.map((type: StoryType) => {
                  const attrs: StoryType["attributes"] = type.attributes;
                  if (!attrs) return null; // Skip if attributes is undefined
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
                xmlns="http://www.w3.org/2000/svg"
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

        {/* Age Dropdown */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <select
              className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                            px-5 py-2 shadow-lg font-[Pacifico] text-lg
                            focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
              value={selectedAge}
              onChange={handleAgeChange}
            >
              <option value="" disabled>
                🎂 Choose Age 🎂
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
                xmlns="http://www.w3.org/2000/svg"
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
      </div>
    </section>
  );
}
