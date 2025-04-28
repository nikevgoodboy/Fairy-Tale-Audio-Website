import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import Detail from "./components/Detail";

export default function StoryDetail() {
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    fetch(
      `http://62.72.46.248:1337/api/stories/pzu6dz18p3fev0l8pukj04pp?populate=*`
    )
      .then((res) => res.json())
      .then((data) => setStory(data.data))
      .catch((error) => console.error("Error fetching story:", error));
  }, []);

  return (
    <main>
      {/* Render HeroSection only when story is loaded */}
      {story && <HeroSection story={story} />}
      <Detail />
    </main>
  );
}
