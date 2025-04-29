import React, { useState, useEffect } from "react";
import Hero from "./components/hero";
import Card from "../../components/Card/Card";

export default function Story() {
  const [stories, setStories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Initial fetch for all stories
  useEffect(() => {
    fetch("http://62.72.46.248:1337/api/stories?populate=*")
      .then((res) => res.json())
      .then((data) => setStories(data.data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  // Fetch filtered stories based on search query
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

  // Handle search query change
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query); // Set search query
    fetchFilteredStories(); // Fetch stories based on search query
  };

  return (
    <main>
      {/* Hero Section */}
      <Hero onSearchQueryChange={handleSearchQueryChange} />

      {/* Stories Display */}
      {stories.length > 0 ? (
        <Card stories={stories} />
      ) : (
        <p className="text-center">Loading stories...</p>
      )}
    </main>
  );
}
