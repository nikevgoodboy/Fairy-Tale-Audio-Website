export default function Button() {
  return (
    <div className="flex flex-wrap gap-5 bg-white p-5">
      {/* Listen Button */}
      <button className="flex items-center gap-2 w-36 h-14 bg-[#FF0E4D] text-white text-xl font-bold py-2 px-4 rounded-xl hover:bg-[#EB5757] transition duration-300 ease-in-out">
        <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
        </svg>
        Listen
      </button>
      
      {/* Favorite Button */}
      <button className="flex items-center gap-2 w-36 h-14 bg-[#F8275F] text-black text-xl font-bold py-2 px-4 rounded-xl hover:bg-[#EB5757] transition duration-300 ease-in-out">
        <svg className="w-8 h-8 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4 13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
        </svg>
        Favorite
      </button>
      
      {/* Login Button */}
      <button className="w-72 h-14 bg-[#FF0E4D] text-white text-xl font-bold py-2 px-4 rounded-xl hover:bg-[#EB5757] transition duration-300 ease-in-out border-2 border-[#2F80ED]">
        Login
      </button>
      
      {/* Subscribe Button */}
      <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 font-medium rounded-lg text-sm px-4 py-2">
        Subscribe
      </button>
      
      {/* Explore Stories Button */}
      <a href="/">
        <button className="bg-[#FF0E4D] hover:bg-gray-800 text-white font-medium py-2 px-5 sm:py-3 sm:px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
          Explore Stories
        </button>
      </a>
    </div>
  );
}
