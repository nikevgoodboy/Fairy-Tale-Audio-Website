import images1 from "../../../assets/dd1.png";

export default function Detail() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-12">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-[#FF0E4D] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
          OPERATION WILLIWAW
        </h1>
      </div>

      {/* Story Paragraph */}
      <div className="text-center mt-6 md:mt-10">
        <p className=" text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          In a faraway land, nestled between rolling hills, there stood a small
          stone cottage. It was home to an elderly mother goat who lived
          peacefully with her seven precious little kids, each one more special
          than the last.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mt-10">
        <img
          src={images1}
          alt="storybook scene"
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-3xl rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}
