import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import SearchGif from "./search-gif";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gif, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gif.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2 items-center">
          <img src="/logo.png" alt="Giphy" className="w-16" />
          <h1 className="text-4xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">
          {/* Render Categories */}
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link
                key={category.name}
                to={`/${category.name_encoded}`}
                className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
              >
                {category.name}
              </Link>
            );
          })}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>

          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}

          <button>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-100 block lg:hidden"
            />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-16 px-10 pt-6 pb-9 w-full gradient z-20 rounded-md">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => {
                return (
                  <Link
                    key={category.name}
                    to={`/${category.name_encoded}`}
                    className="font-bold"
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <SearchGif />
    </nav>
  );
};

export default Header;
