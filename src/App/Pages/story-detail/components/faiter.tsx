export default function faiter() {
  return (
    <section>
      <div className="  flex items-center justify-center">
        <div className="flex flex-col me-2 space-y-8">
          <div className="relative w-70  rounded-full border-2 border-pink-500 bg-black">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-4  py-2 bg-transparent text-gray-400 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex space-x-8 ml-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">TYP STOIES</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                  />
                  <span className="text-gray-700">Classic</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                  />
                  <span className="text-gray-700">Adventure</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                  />
                  <span className="text-gray-700">Animal</span>
                </label>
              </div>
            </div>
            <div className="border-l-2 border-gray-400 h-32 self-center"></div>
            <div>
              <h2 className="text-lg font-semibold mb-4">AGES</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                  />
                  <span className="text-gray-700">0 - 3</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                  />
                  <span className="text-gray-700">4 - 6</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                  />
                  <span className="text-gray-700">7 - 11</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
