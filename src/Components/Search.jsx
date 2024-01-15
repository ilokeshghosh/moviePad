import React, { useEffect, useState } from "react";
import service from "../services/service";
import { TiStarFullOutline } from "../icons/index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMovieCategory, setTvCategory } from "../store/categorySlice";
import { updateStatus, clearStatus } from "../store/errorSlice";

export default function Search() {
  const [option, setOption] = useState("movie");
  const [query, setQuery] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const dispatch = useDispatch();
  const [conditionalText, setConditionalText] = useState(
    "Lost in the cosmos of possibilities! Enter a celestial query to navigate our universe."
  );

  const movieGenresList = useSelector(
    (state) => state.categories.movieCategory
  );
  const tvGenresList = useSelector((state) => state.categories.tvCategory);

  // checking for movie genres list
  useEffect(() => {
    if (movieGenresList.length <= 0) {
      try {
        const localMovieCategory = localStorage.getItem("movieGenres");
        if (localMovieCategory) {
          const movieCategory = JSON.parse(localMovieCategory);
          if (movieCategory) {
            dispatch(setMovieCategory(movieCategory));
          } else {
            console.log("invalid data");
          }
        } else {
          // api call
          service
            .getMovieCategoriesList()
            .then((data) => {
              if (data) {
                dispatch(setMovieCategory(data));
                localStorage.setItem("movieGenres", JSON.stringify(data));
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

  // checking for tv genres list
  useEffect(() => {
    if (tvGenresList.length <= 0) {
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

  function getGenreName(arrayIds) {
    const result = [];
    if (tvGenresList && movieGenresList) {
      arrayIds.forEach((id) => {
        option === "tv"
          ? tvGenresList.map((genre, index) => {
              if (genre.id === id && genre.name) {
                result.push(genre.name);
              }
            })
          : movieGenresList.map((genre, index) => {
              if (genre.id === id && genre.name) {
                result.push(genre.name);
              }
            });
      });
    }
    return result;
  }

  function handleForm(e) {
    e.preventDefault();
    if (option && query) {
      switch (option) {
        case "movie":
          service
            .searchMovie(query)
            .then((data) => {
              if (data.length > 0) {
                setSearchedData(data);
              } else {
                setConditionalText(
                  `Exploring the unknown, but your query didn't light up the stars. Try another cosmic search or chart a new course!`
                );
              }
            })
            .catch((error) => {
              dispatch(updateStatus(error.message));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            });
          break;
        case "tv":
          service
            .searchTv(query)
            .then((data) => {
              if (data) {
                setSearchedData(data);
              }
            })
            .catch((error) => {
              dispatch(updateStatus(error.message));
              setTimeout(() => {
                dispatch(clearStatus());
              }, 3000);
            });
          break;
        default:
          dispatch(updateStatus("invalid input"));
          setTimeout(() => {
            dispatch(clearStatus());
          }, 3000);
      }
    } else {
      setConditionalText(
        `Lost in the cosmos of possibilities! Enter a celestial query to navigate our universe.`
      );
      setSearchedData([]);
    }
  }


  return (
    <div
      id="search"
      className="text-white md:pt-20 pt-14 h-screen z-0 relative flex flex-col gap-10"
    >
      {/* bg vectors */}
      <div className="z-[10]">
        <div className="absolute top-[-20%] md:inline-block hidden   z-[-1]  -left-[3%]  bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
      </div>

      {/* search wrapper */}
      <div className="flex  w-full  gap-6 md:pl-32 md:flex-row flex-col">
        {/* search container */}
        <div className="bg-black md:w-[60%] mx-auto  flex items-center relative  rounded-lg text-base md:text-xl  py-1 md:py-4 z-[10]">
          <form
            onSubmit={handleForm}
            name="searchForm"
            className=" flex w-full items-center gap-2 justify-between px-2 h-full"
          >
            <select
              className="bg-transparent text-base md:text-xl outline-none text-center selection:bg-transparent"
              name="type"
              id="type"
              onInput={(e) => setOption(e.target.value)}
            >
              <option className=" bg-black" value="movie">
                Movie
              </option>
              <option className=" bg-black" value="tv">
                Tv
              </option>
            </select>
            <input
              onInput={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Explore films here..."
              className="md:w-[80%] w-[90%] bg-transparent h-full outline-none  text-white "
              type="text"
              name="query"
              id="query"
            />

            <span className="h-[60%] border "></span>
            <input
              className="px-3 cursor-pointer selection:bg-transparent"
              type="submit"
              value="Search"
            />
          </form>
        </div>
      </div>

      {/* result container */}
      <div className="flex flex-wrap gap-10 md:px-10 overflow-x-auto no-scrollbar justify-between  h-full">
        {searchedData.length <= 0 ? (
          <>
            <h1 className="text-center  w-full text-3xl text-red-400 h-full  flex justify-center items-center selection:bg-transparent">
              {conditionalText}
            </h1>
          </>
        ) : (
          <>
            {searchedData.map((data, index) => (
              <Link
                to={`${
                  option === "movie" ? `/movie/${data.id}` : `/tv/${data.id}`
                }`}
                key={index}
                className="w-[400px] hover:scale-110 transition-all duration-300 ease-linear h-[400px] cursor-pointer mx-auto  z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
                }}
              >
                {" "}
                {/* card cover shadow filter */}
                {data.backdrop_path ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <h1 className="text-red-400 font-bold text-lg absolute top-[30%] left-[30%]">
                      Oops! Image lost in space.
                    </h1>
                  </>
                )}
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
                    
                      <TiStarFullOutline className="flex justify-center items-center text-6xl text-yellow-400 z-[-4]" />

                      <h2 className="text-black font-bold absolute top-[33%] left-[35%]">
                        {data.vote_average.toFixed(1)}
                      </h2>
                    </div>
                  </div>

                  {/* lower section */}
                  <div className="flex flex-col w-full  justify-start items-start gap-2 ">
                    {/* name */}
                    <h1 className="w-full text-2xl font-bold">
                      {data.title || data.name}
                    </h1>
                    {/* first_air_date */}
                    <h2>
                      {`
                     ${
                       new Date(data.release_date).getDay() < 10 ||
                       new Date(data.first_air_date).getDate() < 10
                         ? "0"
                         : ""
                     }${
                        new Date(data.release_date).getDay() ||
                        new Date(data.first_air_date).getDate()
                      } 
                     
                     / 
                     ${
                       new Date(data.release_date).getMonth() < 10 ||
                       new Date(data.first_air_date).getMonth() + 1 < 10
                         ? "0"
                         : ""
                     }${
                        new Date(data.release_date).getMonth() ||
                        new Date(data.first_air_date).getMonth() + 1
                      }
                     
                     /
                     ${
                       new Date(data.release_date).getFullYear() ||
                       new Date(data.first_air_date).getFullYear()
                     }`}
                    </h2>

                    {/* genres */}
                    <div className=" flex gap-4 items-center text-xs w-full font-bold">
                      {getGenreName(data.genre_ids).map((name, index) => (
                        <h2 key={index}>{name}</h2>
                      ))}
                    </div>

                    <h2 className="text-lg font-bold tracking-widest bg-white/20 px-4 rounded-lg text-center">
                      {data.original_language}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
