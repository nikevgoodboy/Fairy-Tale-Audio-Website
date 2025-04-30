export default function HeroSection() {
  return (
    <section className="min-h-screen flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-center flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}

          <article className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight ">
              <span className="block">The Wolf and the Seven Little Kids</span>

              <span className="block text-[#FF0E4D]">
                Short Stories & Audiobooks
              </span>
            </h1>

            <p className=" text-base sm:text-lg lg:text-xl max-w-md lg:max-w-lg mx-auto md:mx-0">
              While Mummy Goat is away, the clever little kids face off against
              a sly and scheming wolf. Will they outsmart him—or be his next
              meal?
            </p>

            {/* CTA Buttons */}

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              {/* Listen Button */}

              <a href="/">
                <audio controls>
                  <source src="" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </a>

              {/* Favorite Button */}
            </div>
          </article>

          {/* Image Section */}

          <figure className="w-[250px] sm:w-[390px] md:w-1/3">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto group">
              {/* Glow Background */}

              <div className="absolute -inset-4 rounded-[1rem] bg-gradient-to-br from-[#ff7eb3] to-[#ff758c] opacity-20 blur-2xl backdrop-blur-sm pointer-events-none -z-10" />

              {/* Image Container */}

              <div className="overflow-hidden rounded-[1rem] shadow-lg ring-2 ring-pink-500/70 transform transition duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-1">
                <img
                  src="https://assets.sooperbooks.com/story-pics/21d4b624-c35c-41a8-a48a-9bd4a518b1b5the-wolf-the-seven-bedtime-story-animated-cover.375x500.webp"
                  alt="Wolf and the Seven Little Kids Story"
                  className="w-full h-[400px] sm:h-[450px] lg:h-[500px] object-cover rounded-[1rem] filter brightness-90 contrast-125 group-hover:brightness-100 group-hover:contrast-110 transition-all ease-in-out"
                />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
