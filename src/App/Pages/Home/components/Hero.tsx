import vectorImage from "../../../../assets/vector.png";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse gap-12 md:gap-8 lg:gap-12 xl:gap-24 md:flex-row items-center">
          <article className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block">Enchanting</span>
              <span className="block">
                Tales for <span className="text-[#FF0E4D]">Young</span>
              </span>
              <span className="block">Imaginations</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl max-w-md lg:max-w-lg mx-auto md:mx-0">
              Discover magical bedtime stories that spark creativity and bring
              families closer together.
            </p>

            <div>
              <a href="/">
                <button className="bg-[#FF0E4D] hover:bg-gray-800 text-white font-medium py-2 px-5 sm:py-3 sm:px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer">
                  Explore Stories
                </button>
              </a>
            </div>
          </article>
          {/* Image Section - Better responsive sizing */}
          <figure className="w-full md:w-1/2 px-4 sm:px-0">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              <div className="absolute -inset-3 sm:-inset-4 bg-purple-300 rounded-full opacity-20 blur-xl" />
              <img
                src={vectorImage}
                alt="Children's storybook illustration"
                className="relative w-full h-auto object-contain rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
