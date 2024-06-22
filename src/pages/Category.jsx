import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import Social from "../components/social";

const Category = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { category } = useParams();
  const { gif } = GifState();

  const fetchCategoryResults = async () => {
    setLoading(true);
    const { data } = await gif.gifs(category, category);

    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 my-4">
      <div className="w-full sm:w-72">
        {loading ? (
          <div className="w-full sm:w-44 h-44 bg-gray-200 animate-pulse"></div>
        ) : (
          <>{results.length > 0 && <Gif gif={results[0]} hover={false} />}</>
        )}

        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>

        <Social />

        <div className="divider" />
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {loading ? (
              <div className="w-full sm:w-64 h-64 bg-gray-300 animate-pulse"></div>
            ) : (
              <>
                {results.slice(1).map((gif) => (
                  <div key={gif.id}>
                    {loading ? (
                      <div className="w-full sm:w-64 h-64 my-5 bg-gray-300 animate-pulse"></div>
                    ) : (
                      <Gif gif={gif} />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
