import { useEffect, useState } from "react";
import { MovieSlider } from "./";
import service from "../services/service";

export default function Trending() {
  const [trendingMovies, setTrendingMovie] = useState([]);

  useEffect(() => {
    service.trendingMovies().then((data) => {
      setTrendingMovie(data);
    });
  }, []);

  if (trendingMovies.length > 0) {
    return (
      <div className=" flex flex-col md:pt-20 pt-10 gap-5  py-10 md:py-0">
        <h2 className="text-4xl font-bold px-10 w-full text-center md:text-start">
          Trending
        </h2>

        {/* slider  */}
        <div className=" w-full">
          <MovieSlider slideData={trendingMovies} />
        </div>
      </div>
    );
  }
}
