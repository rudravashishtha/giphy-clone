import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import FilterGif from "../components/filter-gif";
import Gif from "../components/gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { gif, filter } = GifState();

  const { query } = useParams();

  const fetchSearchResults = async () => {
    setLoading(true);
    const { data } = await gif.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setSearchResults(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <div className="my-4">
      {loading ? (
        <h2 className="text-4xl pb-3 font-extrabold">
          {" "}
          Searching for: {query}
        </h2>
      ) : (
        <h2 className="text-4xl pb-3 font-extrabold">
          {" "}
          Showing Results for: {query}
        </h2>
      )}
      <FilterGif alignLeft />

      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {searchResults.map((gif) => (
            <>
              {loading ? (
                <div className="w-full sm:w-64 h-64 my-5 bg-gray-300 animate-pulse"></div>
              ) : (
                <Gif key={gif.id} gif={gif} />
              )}
            </>
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for: {query}. Try searching for stickers or text
          instead.
        </span>
      )}
    </div>
  );
};

export default Search;
