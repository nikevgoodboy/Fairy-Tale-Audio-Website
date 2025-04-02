export default function WhatWeOffer() {
  const features = [
    {
      id: 1,
      title: "Unlimited Enjoyment",
      description:
        "Dive into an enchanting world of fairy tales with no restrictions – enjoy unlimited reading and listening anytime, anywhere, sparking endless inspiration and entertainment.",
      image: "/src/assets/Enjoyment.png",
      alt: "Whimsical illustration of children enjoying unlimited fairy tale adventures",
      reversed: false,
    },
    {
      id: 2,
      title: "Seamless Flexibility",
      description:
        "Carry the magic with you on any device – smartphone, tablet, or computer – weaving fairy tales effortlessly into your daily routine or quiet moments of relaxation.",
      image: "/src/assets/Flexibility.png",
      alt: "Illustration of magical fairy tale access across multiple devices",
      reversed: true,
    },
    {
      id: 3,
      title: "Family Bonding",
      description:
        "Perfect for all ages, our service brings families together to share timeless stories, fostering cherished memories and igniting imagination in both young and old.",
      image: "/src/assets/Family.png",
      alt: "Illustration of a family enjoying fairy tales together",
      reversed: false,
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center pb-12 sm:pb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            What We <span className="text-pink-500">Offer</span>
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-pink-500 mx-auto mt-4 sm:mt-6 rounded-full" />
        </header>

        {/* Features */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`flex flex-col ${
                feature.reversed ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-24`}
            >
              {/* Image Container with Glow Effect */}
              <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <div className="relative w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[32rem]">
                  {/* Layered glow effect */}
                  <div className="absolute inset-0 -m-4 sm:-m-6 pointer-events-none">
                    <div className="absolute inset-0 bg-pink-200 rounded-full opacity-20 blur-2xl animate-pulse-slow" />
                    <div className="absolute inset-2 bg-pink-300 rounded-full opacity-25 blur-lg" />
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-pink-200/30">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-pink-400 rounded-full opacity-20 animate-pulse-slow" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-indigo-400 rounded-full opacity-25" />
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {feature.title.split(" ")[0]}{" "}
                  <span className="text-pink-600">
                    {feature.title.split(" ")[1]}
                  </span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
