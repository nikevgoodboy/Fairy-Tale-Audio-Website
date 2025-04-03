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
    <section className="w-full py-12 sm:py-16 lg:py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center pb-10 sm:pb-12 lg:pb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            What We <span className="text-pink-500">Offer</span>
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-pink-500 mx-auto mt-3 sm:mt-4 lg:mt-6 rounded-full" />
        </header>

        {/* Features */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`flex flex-col ${
                feature.reversed ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 transition-all duration-300`}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 relative flex justify-center mb-6 md:mb-0">
                <div className="relative w-full max-w-[16rem] xs:max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[32rem] group">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-pink-200 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300" />

                  {/* Image */}
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="relative w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 lg:space-y-6 text-center md:text-left">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">
                  {feature.title.split(" ")[0]}{" "}
                  <span className="text-pink-600">
                    {feature.title.split(" ")[1]}
                  </span>
                </h2>
                <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-gray-600 leading-relaxed">
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
