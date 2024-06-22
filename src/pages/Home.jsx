import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FilterGif from "../components/filter-gif";

const Home = () => {
  const { gif, gifs, setGifs, filter } = GifState();
  const [loading, setLoading] = useState(false);

  const fetchTrendingGifs = async () => {
    setLoading(true);
    const { data } = await gif.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <div>
      <img
        src="/banner.gif"
        alt="Banner"
        className="mt-2 mb-2 rounded w-full"
      />

      <FilterGif showTrending />

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => {
          return (
            <div key={gif.id}>
              {loading ? (
                <div className="w-full sm:w-64 h-64 my-5 bg-gray-300 animate-pulse"></div>
              ) : (
                <Gif key={gif.title} gif={gif} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
