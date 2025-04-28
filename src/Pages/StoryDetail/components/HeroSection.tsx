interface HeroSectionProps {
  story: any;
}

export default function HeroSection({ story }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex justify-center flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <article className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
              <span className="block">{story.title || "Story Title"}</span>

              <span className="block text-[#FF0E4D]">
                Short Stories & Audiobooks
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl max-w-md lg:max-w-lg mx-auto md:mx-0">
              {story.description || "Default story description."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a href="/">
                <button className="flex items-center gap-2 px-5 py-3 bg-[#FF0E4D] text-white text-lg font-semibold rounded-[10px] hover:bg-[#eb3a61] transition duration-300">
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                  Listen
                </button>
              </a>

              <a href="#">
                <button className="flex items-center gap-2 px-5 py-3 bg-[#fd7a9d] text-white text-lg font-semibold rounded-xl hover:bg-[#eb3a61] transition duration-300">
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4 13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                  </svg>
                  Favorite
                </button>
              </a>
            </div>
          </article>

          {/* Image Section */}
          <figure className="w-[250px] sm:w-[390px] md:w-1/3">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto group">
              <div className="absolute -inset-4 rounded-[1rem] bg-gradient-to-br from-[#ff7eb3] to-[#ff758c] opacity-20 blur-2xl backdrop-blur-sm pointer-events-none -z-10" />
              <div className="overflow-hidden rounded-[1rem] shadow-lg ring-2 ring-pink-500/70 transform transition duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-1">
                <img
                  src={
                    story.cover_image?.data?.url
                      ? `http://62.72.46.248:1337${story.cover_image.data.url}`
                      : "https://res.cloudinary.com/dsfuhhdez/image/upload/v1745376147/three_little_pigs_4740ba3915.webp"
                  }
                  alt={story.title || "Story Cover"}
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
