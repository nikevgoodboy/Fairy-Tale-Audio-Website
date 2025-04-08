export default function Collection() {
  const brandName = "Vast";

  return (
    <section className="w-full flex items-center justify-center">
      <div className="container mx-auto px-6">
        <article className="flex flex-col md:flex-row items-center md:items-start  justify-between gap-8 md:gap-12 lg:gap-16">
          <div className="md:flex-shrink-0 text-center md:text-left mb-6 md:mb-0 ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {brandName} <span className="text-pink-500">Collection</span>
            </h1>
          </div>

          <div className="max-w-4xl md:max-w-xl lg:max-w-2xl">
            <p className="text-2xl md:text-xl">
              Gain access to the world's largest collection of fairy tales, with
              over 4000 captivating stories, including timeless classics and
              hidden gems.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
