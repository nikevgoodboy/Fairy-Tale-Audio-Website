import React from "react";

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
  return (
    <div
      className="w-64 sm:w-72 md:w-80 border-2 border-teal-500 rounded-lg overflow-hidden shadow-lg transition-all duration-300 
      hover:shadow-2xl hover:-translate-y-2 hover:border-teal-400 
      relative group bg-white"
    >
      {/* Glowing effect */}
      <div
        className="absolute inset-0 -z-10 
        bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        blur-xl"
      ></div>

      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/40 
          group-hover:to-black/60 transition-all duration-300"
        ></div>
      </div>
      <div className="p-5 relative">
        <h3
          className="text-pink-500 text-lg font-medium mb-3 transition-colors duration-300 
          group-hover:text-pink-400"
        >
          {title}
        </h3>
        <p
          className="text-gray-800 text-sm transition-colors duration-300 
          group-hover:text-gray-700"
        >
          {description}
        </p>
        {/* Subtle bottom glow */}
        <div
          className="absolute bottom-0 left-0 w-full h-1 
          bg-teal-500/0 group-hover:bg-teal-500/50 transition-all duration-300"
        ></div>
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
      imageUrl:
        "https://media.istockphoto.com/id/522513933/photo/book-and-glowing-letters.jpg?s=1024x1024&w=is&k=20&c=8WfzoSTOdY66J5n4UUAdG-H3UbujWClS0Nxaq5Ai9l0=",
    },
    {
      title: "Unlock Imagination",
      description:
        "Gain access to the world's largest collection of fairy tales, with over 4000 captivating stories, including timeless classics and hidden gems.",
      imageUrl:
        "https://img.freepik.com/free-photo/fantasy-astral-wallpaper-composition_23-2150248011.jpg?t=st=1743577385~exp=1743580985~hmac=d264f96122be359c3a7921dbbe21b36b7454db591699bbca3028f08e9fadc8b6&w=826",
    },
    {
      title: "Explore Tales",
      description:
        "Gain access to the world's largest collection of fairy tales, with over 4000 captivating stories, including timeless classics and hidden gems.",
      imageUrl:
        "https://img.freepik.com/free-photo/cartoon-kids-garden_23-2151548889.jpg?t=st=1743577461~exp=1743581061~hmac=344652fe12c5c0b3abd9a082dee419d452f8a9d96aa205f06cb8be05e9582020&w=826",
    },
  ];

  return (
    <section className="w-full min-h-screen py-16">
      <article className="max-w-6xl mx-auto px-4">
        {/* head */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-semibold">
            Discover <span className="text-pink-500">our content</span>
          </h1>
          <div className="h-1 w-20 bg-pink-500 mx-auto mt-6 rounded-full"></div>
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
