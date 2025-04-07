export default function Hero() {
  return (
    <section>
      <div className=" from-teal-100 to-lime-100 p-8 rounded-lg ">
        <div className="text-center shadow-lg">
          <h1 className="text-5xl font-extrabold text-withe mb-2">
            FAIRY TALES
          </h1>
          <h1 className="text-3xl font-semibold text-pink-600 mb-4">
            Tales for Young
          </h1>
        </div>
      </div>

      <div className="flex flex-col-12 sm:flex-row justify-center p-3 gap-5">
        {/* Story Type Dropdown */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <select
              className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                            px-5 py-2 shadow-lg font-[Pacifico] text-lg
                            focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
            >
              <option value="" disabled selected>
                🌸 Story Type 🌸
              </option>
              <option value="1">✨ Classic Fairytale</option>
              <option value="2">🌈 Magical Adventure</option>
              <option value="3">🐾 Cute Animal Tales</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-6 h-6 text-pink-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Age Dropdown */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <select
              className="w-full bg-pink-100 text-pink-700 rounded-full border-2 border-pink-400 
                            px-5 py-2 shadow-lg font-[Pacifico] text-lg
                            focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 appearance-none"
            >
              <option value="" disabled selected>
                🎂 Choose Age 🎂
              </option>
              <option value="1">👶 0 - 5 years</option>
              <option value="2">🧒 6 - 10 years</option>
              <option value="3">👦 11 - 15 years</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                className="w-6 h-6 text-pink-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
