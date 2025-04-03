export default function Hero() {
  return (
    <section>
      <div className=" from-teal-100 to-lime-100 p-8 rounded-lg ">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-withe mb-2">
            FAIRY TALES
          </h1>
          <h1 className="text-3xl font-semibold text-pink-600 mb-4">
            Tales for Young
          </h1>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center p-2 py-1 mt-4 mb-4 gap-4">
        <div className="w-full sm:w-64">
          <div className="relative">
            <select className="w-full bg-pink-200 rounded-lg border-b-2 border-pink-500 text-gray-800 px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-200 appearance-none">
              <option value="" disabled selected>
                <p> STORY TYPES</p>
              </option>
              <option value="1">
                Classic
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </option>
              <option value="2">Adventure</option>
              <option value="3">Animal</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 text-pink-500 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-64">
          <div className="relative">
            <select className="w-full bg-pink-200 rounded-lg border-b-2 border-pink-500 text-gray-800 px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-200 appearance-none">
              <option value="" disabled selected>
                AGE
              </option>
              <option value="2">0 - 5</option>
              <option value="3">6 - 10</option>
              <option value="3">11 - 15</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
