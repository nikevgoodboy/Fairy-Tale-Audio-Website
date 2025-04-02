import EnjoymentImage from "../../assets/Enjoyment.png";

export default function Enjoyment() {
  const headingText = "Unlimited";

  return (
    <>
      <div className="w-full py-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* first content */}
          <article className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Image Container */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-pink-100 rounded-full opacity-20 blur-lg"></div>
                <img
                  src={EnjoymentImage}
                  alt="Enjoyment illustration"
                  className="relative w-full max-w-lg h-auto rounded-lg shadow-lg object-cover"
                />

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-pink-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-indigo-500 rounded-full opacity-30"></div>
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {headingText} <span className="text-pink-500">Enjoyment</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                Immerse yourself in the enchanting world of fairy tales without
                limits – read or listen as much as you like, anytime and
                anywhere, for endless hours of inspiration and entertainment.
              </p>
            </div>
          </article>
          {/* second content */}
          <article className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Content Container */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {headingText} <span className="text-pink-500">Enjoyment</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                Immerse yourself in the enchanting world of fairy tales without
                limits – read or listen as much as you like, anytime and
                anywhere, for endless hours of inspiration and entertainment.
              </p>
            </div>
            {/* Image Container */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-pink-100 rounded-full opacity-20 blur-lg"></div>
                <img
                  src={EnjoymentImage}
                  alt="Enjoyment illustration"
                  className="relative w-full max-w-lg h-auto rounded-lg shadow-lg object-cover"
                />

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-pink-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-indigo-500 rounded-full opacity-30"></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
