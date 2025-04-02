export default function HeroSection() {
  const vectorImage =
    "https://media.istockphoto.com/id/946853684/photo/mom-and-children-reading-book.jpg?s=612x612&w=0&k=20&c=-X-msnp69ziQbgm2Fqs9PVZldjGGpkmx5t2Vnabe5Hk=";
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
          {/* Image Section - Enhanced responsive design with glowing effect */}
          <figure className="w-full md:w-1/2 px-4 sm:px-0">
            <div className="relative w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[32rem] mx-auto">
              {/* Enhanced glowing effect with layered gradients */}
              <div className="absolute inset-0 -m-4 sm:-m-6 pointer-events-none">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-purple-300 rounded-full opacity-15 blur-3xl animate-pulse" />
                {/* Inner glow */}
                <div className="absolute inset-2 bg-purple-400 rounded-full opacity-25 blur-xl" />
              </div>

              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl ring-1 ring-purple-200/50">
                <img
                  src={vectorImage}
                  alt="Illustration from a children's storybook featuring colorful characters"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  srcSet={`${vectorImage} 320w, ${vectorImage} 640w, ${vectorImage} 1024w`}
                />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
