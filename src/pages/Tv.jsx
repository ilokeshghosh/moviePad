import { useState, useEffect } from "react";
import {
  FaArrowDownLong,
  FaCirclePlay,
  TiStarFullOutline,
  FaUserCircle,
} from "../icons";

import { useParams } from "react-router-dom";
import service from "../services/service";
import { setTvCategory } from "../store/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { Loader, Error } from "./index";
export default function Movie() {
  const { seriesID } = useParams();
  const [series, setSeries] = useState([]);
  const [videoId, setVideoId] = useState();
  const [recommendedSeries, setRecommendedSeries] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [errorPage, setErrorPage] = useState(false);
  const dispatch = useDispatch();
  const genresList = useSelector((state) => state.categories.tvCategory);
  const errorText = useSelector((state) => state.errorReducer.errorText);
  const isError = useSelector((state) => state.errorReducer.isError);

  useEffect(() => {
    service
      .getTvByID(seriesID)
      .then((data) => {
        if (data) {
          setSeries([data]);
          setPageLoader(false);
        }
      })
      .catch((error) => {
        if (error.message === "404") {
          setErrorPage(true);
        }
        dispatch(updateStatus(error.message));
        setTimeout(() => {
          dispatch(clearStatus());
        }, 3000);
      });
  }, [seriesID]);

  useEffect(() => {
    if (series) {
      service
        .getTvVideo(seriesID)
        .then((videos) => {
          videos.map((video) => {
            if (
              video.name === "Official Trailer" ||
              video.name.includes("Official Trailer") ||
              video.name.includes("Trailer")
            ) {
              setVideoId(video.key);
            }
          });
        })
        .catch((error) => {
          dispatch(updateStatus(error.message));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
        });
    }
  }, [series]);

  useEffect(() => {
    if (genresList.length <= 0) {
      try {
        const localTvCategory = localStorage.getItem("tvGenres");
        if (localTvCategory) {
          const tvCategory = JSON.parse(localTvCategory);
          if (tvCategory) {
            dispatch(setTvCategory(tvCategory));
          } else {
            console.log("invalid data");
          }
        } else {
          // api call
          service
            .getTvCategoriesList()
            .then((data) => {
              if (data) {
                dispatch(setTvCategory(data));
                localStorage.setItem("tvGenres", JSON.stringify(data));
              }
            })
            .catch((error) => {
              dispatch(updateStatus(error.message));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            });
        }
      } catch (error) {
        dispatch(updateStatus(error.message));
        setTimeout(() => {
          dispatch(clearStatus());
        }, 3000);
      }
    }
  }, []);

  //recommended code
  useEffect(() => {
    service
      .recommendedTv(seriesID)
      .then((data) => {
        setRecommendedSeries(data);
      })
      .catch((error) => {
        if (error.message === "404") {
          setErrorPage(true);
        }
        dispatch(updateStatus(error.message));
        setTimeout(() => {
          dispatch(clearStatus());
        }, 3000);
      });
  }, []);

  useEffect(() => {
    setPageLoader(false);
  }, [series]);

  function getGenreName(arrayIds) {
    const result = [];
    if (genresList) {
      for (let i = 0; i < arrayIds.length; i++) {
        for (let j = 0; j < genresList.length; j++) {
          if (genresList[j].id === arrayIds[i].id) {
            result.push(genresList[j].name);
          } else if (genresList[j].id === arrayIds[i]) {
            result.push(genresList[j].name);
          }
        }
      }
    }
    return result;
  }


  if (!pageLoader && series.length > 0) {
    return (
      <div
        className="bg-slate-950 z-0 relative overflow-x-hidden no-scrollbar"
        style={{ fontFamily: "Syne,sans-serif" }}
      >
        {/* bg vectors */}
        <div className="z-[10]">
          <div className="absolute top-[30%] z-[-1]   -right-[30%]  bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

          <div className="absolute top-[50%]   z-[-1]  -left-[3%]  bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
        </div>

        {series.map((data, index) => (
          <div key={index} className="w-full">
            <div
              className={`bg-center bg-cover bg-no-repeat h-screen text-white md:py-6  md:px-32 px-0 relative pb-10 md:pb-0`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
                boxShadow: "inset 0px -120px 100px 0px rgb(2 6 23)",
              }}
            >
              {/* cover */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/3 0 z-0 "></div>
              <div className=" absolute top-0 left-0 w-full h-full z-0 bg-slate-900/30"></div>

              {/* cover */}
              <div
                className=" h-[15%]   left-0 absolute bottom-0  w-full z-[20]"
                style={{ boxShadow: "inset 0px -30px 30px 0px rgb(2 6 23)" }}
              ></div>

              {data.backdrop_path ? (
                <></>
              ) : (
                <>
                  {" "}
                  <h1 className="text-red-400 font-bold text-lg absolute md:top-[30%] top-[20%] left-[45%]">
                    Oops! Image lost in space.
                  </h1>
                </>
              )}

              {/* scroll down button */}
              <div className="absolute bottom-[36%]  md:inline-block hidden left-[55%]  mx-auto text-white z-0 text-3xl animate-bounce">
                <FaArrowDownLong />
              </div>

              {/* content section */}
              <div className="absolute top-0 left-0 w-full h-full md:px-20 px-0">
                {/* upper section /title*/}
                <div className="w-full md:text-start  text-center   md:pt-10 pt-4 h-1/3 ">
                  {/* title */}
                  <h1 className="md:text-[6rem] text-[2.5rem] font-bold ">
                    {data.name}
                  </h1>
                </div>

                {/* mid section / data and stars */}
                <div className="w-full flex justify-between md:items-center items-start px-5 md:py-10 py-0 z-50 h-1/3 ">
                  {/* left / date and time*/}
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    {/* in theatres text */}
                    <h3 className="text-2xl ">first air on</h3>
                    {/* month and year */}
                    <div className="px-4 flex flex-col justify-between items-center text-4xl font-semibold">
                      {/* month */}
                      <h2>
                        {new Date(data.first_air_date).toLocaleString(
                          "default",
                          { month: "long" }
                        )}
                      </h2>
                      <h2>{new Date(data.first_air_date).getFullYear()}</h2>
                    </div>
                  </div>

                  {/* right/stars */}
                  <div className="h-[200px] flex flex-col items-start gap-2">
                    <h3 className="text-xl font-semibold ">STARRING</h3>
                    <ul className="px-2 text-lg flex flex-col gap-3 overflow-y-auto no-scrollbar">
                      {data.credits.cast.map((cast, index) => (
                        <li key={cast.id} className="">
                          <a
                            className="flex gap-1"
                            target="_blank"
                            href={`https://www.themoviedb.org/person/${cast.id
                              }-${cast.name.toLowerCase()}`}
                          >
                            {cast.profile_path ? (
                              <>
                                <img
                                  className="w-[26px] h-[30px]  rounded-full"
                                  src={`${cast.profile_path
                                      ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                                      : ""
                                    }`}
                                  alt=""
                                />
                              </>
                            ) : (
                              <>
                                <FaUserCircle className="w-[26px] h-[30px]  rounded-full" />
                              </>
                            )}
                            {cast.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* lower section / button and movie desc */}
                <div className="flex justify-start flex-col md:flex-row  md:gap-20 gap-3 md:pt-18 z-50 h-1/3 px-1 md:px-0 ">
                  {/* trailer section */}
                  <div className="w-[20%]   md:w-[5%] md:static relative top-0 mx-auto md:mx-0">
                    <button className="border-2 px-4 rounded-xl ">
                      <a
                        className="flex justify-center items-center gap-2 font-bold"
                        href="#trailer"
                      >
                        Trailer <FaCirclePlay />
                      </a>{" "}
                    </button>
                  </div>

                  {/* movie information */}
                  <div
                    className={`md:w-[40%]  w-[90%] text-center mx-auto overflow-y-auto no-scrollbar  relative `}
                  >
                    <h3 className="text-2xl font-light "> {data.overview}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* trailer section */}
            <div
              id="trailer"
              className="h-screen  text-white md:py-1 py-20 flex flex-col  md:gap-4 gap-24  relative z-[0]"
              style={{ fontFamily: "Syne,sans-serif" }}
            >
              {/* upper section */}
              <div className="flex flex-col  items-center md:gap-2  md:py-8 py-3 z-[10]">
                <h1 className="md:text-6xl text-3xl font-semibold text-center md:text-start">
                  {data.name}
                </h1>
                {/* tags and content */}
                <div className="flex md:gap-10 gap-2 flex-col md:flex-row  md:justify-center justify-between  items-center w-full ">
                  <h2 className="bg-slate-500 md:px-6  px-2 rounded-md">
                    {data.original_language}
                  </h2>
                  <h3>
                    {new Date(data.first_air_date).toLocaleDateString()} to{" "}
                    {new Date(data.last_air_date).toLocaleDateString()}
                  </h3>

                  {/* <h3>Action,Science,Fiction</h3> */}
                  <div className="flex gap-3">
                    {" "}
                    {getGenreName(data.genres).map((genre, index) => (
                      <h2 key={index}>
                        {genre}
                        {index > data.genres.length - 2 ? "" : ","}
                      </h2>
                    ))}
                  </div>

                  <h3>
                    {data.number_of_seasons} Seasons, {data.number_of_episodes}{" "}
                    Episodes{" "}
                  </h3>
                  <h3>Status:{data.status}</h3>
                </div>
              </div>

              {/* video palyer section */}
              <div className="border border-slate-400 md:h-[70%] h-[50%] rounded-lg md:w-[60%] w-full mx-auto z-[8]">
                <iframe
                  className="w-full z-[12] h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${videoId}?si=VrlbqVgbkS7bdrrK`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ))}

        {/* recomanded section */}
        <div
          className="h-screen z-[10] text-white py-10 flex flex-col justify-start items-center gap-20 "
          style={{ fontFamily: "Syne,sans-serif" }}
        >
          {/* upper section */}
          <div className=" flex justify-between w-[80%] mx-auto">
            <h2 className="md:text-5xl text-3xl font-semibold">Recommended</h2>
            <img
              className="md:w-[200px] w-[100px]"
              src="https://ik.imagekit.io/8fgpvoiai/MoviePad/quotes%20marks_HD5Th9EWh.png?updatedAt=1704369615652"
              alt=""
            />
          </div>

          {/* cards contaier*/}
          <div className=" flex-wrap md:justify-between justify-center  overflow-x-auto no-scrollbar gap-10 md:px-10  w-full h-[90%] flex">
            {recommendedSeries.length <= 0 ? (
              <>
                {" "}
                <div className="w-full text-center ">
                  <h1 className="text-4xl text-red-400 ">
                    Lost in the data galaxy. No findings yet!
                  </h1>
                </div>
              </>
            ) : (
              <>
                {" "}
                {recommendedSeries.map((data) =>
                  data.backdrop_path ? (
                    <HashLink
                      key={data.id}
                      smooth
                      target="_blank"
                      to={`/tv/${data.id}`}
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
                      }}
                      className="w-[400px]  h-[400px] cursor-pointer bg-no-repeat bg-center bg-cover hover:scale-110 transition-all ease-linear duration-300 z-10 relative"
                    >
                      {/* card cover shadow filter */}
                      <div
                        className=" z-[-1] hover:shadow-none transition-all ease-linear duration-200  absolute top-0 left-0 w-full h-full"
                        style={{
                          boxShadow: "inset 0px -100px 120px 10px rgb(2 6 23)",
                        }}
                      ></div>

                      {/* card content */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col  px-5  justify-between items-start py-4">
                        {/* upper section */}
                        <div className="w-full flex  justify-start items-center ">
                          {/* rating section */}
                          <div className="relative">
                            {/* <TiStarFullOutline className="text-yellow-500 text-6xl" /> */}
                            <TiStarFullOutline className="flex justify-center items-center text-6xl text-yellow-400 z-[-4]" />
                            {/* </TiStarFullOutline> */}
                            <h2 className="text-black font-bold absolute top-[33%] left-[35%]">
                              {data.vote_average.toFixed(1)}
                            </h2>
                          </div>
                        </div>

                        {/* lower section */}
                        <div className="flex flex-col w-full  justify-start items-start gap-2 ">
                          {/* name */}
                          <h1 className="w-full text-2xl font-bold">
                            {data.name}
                          </h1>


                          <h2>
                            First Air On :{" "}
                            {new Date(data.first_air_date).toLocaleDateString()}
                          </h2>

                          {/* genres */}
                          <div className=" flex gap-4 items-center text-xs w-full font-bold">
                            {getGenreName(data.genre_ids).map(
                              (genre, index) => (
                                <h2 key={index}>{genre}</h2>
                              )
                            )}

                          </div>
                          <h2 className="text-lg font-bold tracking-widest bg-white/20 px-4 rounded-lg text-center">
                            {data.original_language}
                          </h2>
                        </div>
                      </div>
                    </HashLink>
                  ) : (

                    <></>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else if (errorPage) {
    return <Error />;
  } else {
    return <Loader />;
  }
}
