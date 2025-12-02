const NotFoundPage = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-violet-700">404</h1>

      <p className="mt-4 text-xl text-gray-700">
        The page you're looking for doesn't exist.
      </p>

      <p className="text-gray-500 mt-1">
        You may have mistyped the address or the page may have moved.
      </p>

      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 rounded-md bg-violet-700 text-white font-semibold 
                   hover:bg-violet-800 transition"
      >
        Go back home
      </a>
    </div>
  );
};

export default NotFoundPage;
