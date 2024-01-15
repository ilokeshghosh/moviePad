import { useEffect, useState } from "react";
import { MovieSlider } from "./";
import service from "../services/service";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";

export default function Trending() {
  const [trendingMovies, setTrendingMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    service
      .trendingMovies()
      .then((data) => {
        setTrendingMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        dispatch(updateStatus(error.message));
        setTimeout(() => {
          dispatch(clearStatus());
        }, 3000);
      });
  }, []);

  if (trendingMovies.length > 0) {
    return (
      <div className=" flex flex-col md:pt-20 pt-10 gap-5  py-10 md:py-0 z-[10]">
        <h2 className="text-4xl font-bold px-10 w-full text-center md:text-start">
          Trending
        </h2>

        {/* slider  */}
        <div className=" w-full">
          {loading ? (
            <>
              {" "}
              <div className="flex gap-5 px-2 w-full justify-between">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="text-white w-[300px] h-[400px]  flex flex-col justify-between  items-start bg-slate-900/40 backdrop-blur-lg"
                  >
                    <div className="w-full h-[60%] skeleton bg-slate-900">
                      <img src="" alt="" />
                    </div>

                    <div className="flex flex-col justify-evenly w-full h-[30%] px-2 ">
                      <h2 className="bg-slate-400/10 h-5 rounded-md w-[60%] skeleton"></h2>
                      <h2 className="bg-slate-400 h-2 rounded-md w-[40%] skeleton"></h2>
                      <h2 className="flex gap-5 w-[70%]">
                        <span className="bg-slate-400 skeleton h-2 rounded-md w-1/4"></span>
                        <span className="bg-slate-400 skeleton w-1/4 h-2 rounded-md"></span>
                        <span className="bg-slate-400 skeleton h-2 rounded-md w-1/4"></span>
                        <span className="bg-slate-400 skeleton h-2 rounded-md w-1/4"></span>
                      </h2>
                      <h2 className="bg-slate-400/50 rounded-lg h-6 w-[14%] skeleton"></h2>
                    </div>
                  </div>
                ))}

                {/* content loader section */}
              </div>
            </>
          ) : (
            <>
              <MovieSlider slideData={trendingMovies} />
            </>
          )}
        </div>
      </div>
    );
  }
}
