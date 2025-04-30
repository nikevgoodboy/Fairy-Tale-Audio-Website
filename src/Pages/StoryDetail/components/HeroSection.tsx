import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoryViewer = () => {
  const { documentId } = useParams(); // 👈 Get documentId from URL
  interface Story {
    title: string;
    summary: string;
    audio?: { url: string };
    cover_image?: { url: string };
    content: string;
  }

  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `http://62.72.46.248:1337/api/stories/${documentId}?populate=*`;

  useEffect(() => {
    setLoading(true);
    const fetchStory = async () => {
      try {
        const response = await axios.get(apiUrl);
        setStory(response.data.data);
      } catch (err) {
        setError("Failed to load story: " + (err as any).message);
      }
      setLoading(false);
    };

    fetchStory();
  }, [apiUrl]);

  if (error) return <p>{error}</p>;
  if (!story) return <p>{loading}</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center mx-30">
        <div className="px-15 pb-10">
          <h2 className="text-4xl font-bold font-serif text-[#2E014F] my-5">
            {story.title}
          </h2>
          <p className="font-serif text-[#4D4848] text-lg">{story.summary}</p>
          <audio controls className="mt-5">
            <source src={story.audio?.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="inline-block m-4">
          <img
            className="w-60 rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 hover:scale-105 transition duration-300 ease-in-out"
            src={story.cover_image?.url}
            alt="Story Cover"
            width="200"
          />
        </div>
      </div>
      <div className="">
        <div dangerouslySetInnerHTML={{ __html: story.content }} />
      </div>
    </>
  );
};

export default StoryViewer;
