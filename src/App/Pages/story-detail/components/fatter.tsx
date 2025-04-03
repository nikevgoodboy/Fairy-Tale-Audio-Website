export default function fatter() {
  return (
    <div>
      <div>
        <div className="w-64 relative">
          <select className="w-full bg-gray-100 border-b-2 border-gray-300 text-gray-800 px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-200 appearance-none">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
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

        <div className="w-64">
          <select className="w-full bg-white border-2 border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600 focus:shadow-outline transition-all duration-200 appearance-none">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>

        <div className="w-64">
          <select className="w-full bg-gray-200 text-gray-800 rounded-md px-4 py-2 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
  );
}
