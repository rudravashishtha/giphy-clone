/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import Social from "../components/social";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const SingleGIF = () => {
  const { type, slug } = useParams();
  const [singleGif, setSingleGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { gif, addToFavorites, favorites } = GifState();

  const fetchGif = async () => {
    setLoading(true);
    const gifId = slug.split("-");
    const { data } = await gif.gif(gifId[gifId.length - 1]);
    const { data: related } = await gif.related(gifId[gifId.length - 1], {
      limit: 10,
    });

    setSingleGif(data);
    setRelatedGifs(related);
    setLoading(false);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }

    fetchGif();
    setReadMore(false);
  }, []);

  const shareGif = () => {
    // Assignment
  };

  const EmbedGif = () => {
    // Assignment
  };

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {singleGif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={singleGif?.user?.avatar_url}
                alt={singleGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{singleGif?.user?.display_name}</div>
                <div className="faded-text">{singleGif?.user?.username}</div>
              </div>
            </div>
            {singleGif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? singleGif?.user?.description
                  : singleGif?.user?.description.slice(0, 80)}

                {singleGif?.user?.description.length > 80 && (
                  <div
                    className="flex items-center faded-text cursor-pointer"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read More <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                )}
              </p>
            )}
          </>
        )}

        <Social />

        <div className="divider" />

        {singleGif?.source && (
          <div>
            <span className="faded-text">Source: </span>
            <div className="flex items-center text-sm gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={singleGif.source} target="_blank" className="truncate">
                {singleGif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{singleGif.title}</div>
            {loading && (
              <div className="w-full h-96 bg-gray-200 animate-pulse"></div>
            )}
            <Gif gif={singleGif} hover={false} />

            {/* Mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img
                src={singleGif?.user?.avatar_url}
                alt={singleGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{singleGif?.user?.display_name}</div>
                <div className="faded-text">{singleGif?.user?.username}</div>
              </div>

              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(singleGif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(singleGif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div className="my-3">
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 mt-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGIF;
