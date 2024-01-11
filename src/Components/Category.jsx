import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../services/service";
import { useDispatch } from "react-redux";
import { TiStarFullOutline } from "../icons/index";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { setMovieCategory } from "../store/categorySlice";
export default function Category() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const categories = useSelector((state) => state.categories.movieCategory);
  function handleCategory(e, id) {
    document.querySelectorAll(".filter").forEach((filter) => {
      filter.classList.remove(
        // "md:px-6",
        // "px-3",
        // "rounded-full",
        // "py-1",
        "bg-slate-500"
      );
    });
    e.currentTarget.classList.add(
      //   "md:px-6",
      //   "px-3",
      //   "rounded-full",
      //   "py-1",
      "bg-slate-500"
    );

    service.getMoviesListByCategories(id).then((data) => {
      if (data) {
        setMovies(data);
      }
    });
  }

  useEffect(() => {
    const id = 28;
    const genre = "Action";
    service.getMoviesListByCategories(id).then((data) => {
      if (data) {
        setMovies(data);
      }
    });
  }, []);

  useEffect(() => {
    if (categories.length <= 0) {
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
          service.getMovieCategoriesList().then((data) => {
            if (data) {
              dispatch(setMovieCategory(data));
              localStorage.setItem("movieGenres", JSON.stringify(data));
            }
          });
        }
      } catch (error) {
        console.log("error in category Component");
      }
    }
  }, []);

  function getGenreName(arrayIds) {
    const result = [];
    if (categories) {
      arrayIds.forEach((id) => {
        const data = categories.find((genre) => {
          if (genre.id === id) {
            return genre.name;
          }
        });

        result.push(data);
      });
    }
    return result;
  }

  if (categories.length > 0 && movies.length > 0) {
    return (
      <div id="category" className="relative h-screen text-white pt-20 ">
        {/* background vectors */}
        <div className="">
          <div className="absolute top-[60%] hidden  xl:inline-block -left-[15%]  z-0 bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
          <div className="absolute -bottom-[10%]   z-0  xl:inline-block   right-[2%] bg-center bg-no-repeat bg-cover  h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
        </div>

        {/* category section */}
        <div className="w-full h-screen z-[10] flex flex-col gap-10  ">
          {/* filter bar */}
          <div
            className=" md:w-[80%] w-full  bg-black z-[50]   mx-auto rounded-full h-14 px-2 "
            style={{ zIndex: "" }}
          >
            <ul className="w-full  flex justify-between z-[50]  md:px-10 px-2 gap-2 overflow-x-auto no-scrollbar  md:text-xl text-xs items-center h-full">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`filter h-full w-[cal(${1 / categories.length})] ${
                    index === 0 ? "bg-slate-500" : ""
                  } md:px-6 px-3 rounded-full    cursor-pointer selection:bg-transparent flex justify-center items-center`}
                  onClick={(e) => handleCategory(e, category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* lower section */}
          <div className="flex flex-wrap gap-10 md:px-10  overflow-x-auto no-scrollbar justify-between">
            {movies.map((movie, index) => (
              <Link
                to={`/movie/${movie.id}`}
                key={index}
                className="w-[400px] h-[400px] cursor-pointer mx-auto hover:scale-110 transition-all ease-linear duration-300  z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                style={{
                  // backgroundImage: `url(https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                }}
              >
                {" "}
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
                        {movie.vote_average.toFixed(1)}
                      </h2>
                    </div>
                  </div>

                  {/* lower section */}
                  <div className="flex flex-col w-full  justify-start items-start gap-2 ">
                    {/* name */}
                    <h1 className="w-full text-2xl font-bold">{movie.title}</h1>

                    <h2>{`${
                      new Date(movie.release_date).getDay() + 1 < 10 ? "0" : ""
                    }${new Date(movie.release_date).getDay() + 1} / ${
                      new Date(movie.release_date).getMonth() + 1 < 10
                        ? "0"
                        : ""
                    }${new Date(movie.release_date).getMonth() + 1}/ ${new Date(
                      movie.release_date
                    ).getFullYear()}`}</h2>

                    {/* genres */}
                    <div className=" flex gap-4 items-center text-xs w-full font-bold">
                      {getGenreName(movie.genre_ids).map((genre) => (
                        <h2 key={genre.id}>{genre.name}</h2>
                      ))}
                    </div>

                    <h2 className="text-lg font-bold tracking-widest bg-white/20 px-4 rounded-lg text-center">
                      {movie.original_language}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
