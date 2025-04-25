import React, { useState } from "react";

const SearchComponent = () => {
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
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger the search on Enter key press
        className="p-2 border rounded"
      />

      <button
        onClick={fetchFilteredStories}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

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
          <p>No stories found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
