import { useState, useEffect } from "react";
import Hero from "./components/hero";
import StoryCards from "./components/StoryCards"; // Import Card component

export default function Story() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://62.72.46.248:1337/api/stories?populate=*")
      .then((res) => res.json())
      .then((data) => setStories(data.data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  return (
    <main>
      <Hero />
      {stories.length > 0 ? (
        <StoryCards stories={stories} /> // Pass the fetched stories as a prop to the Card component
      ) : (
        <p>Loading stories...</p>
      )}
    </main>
  );
}
