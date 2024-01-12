import Slider from "../Components/HeroSlider";
import MovieSlider from "../Components/MovieSlider";
import { NavHashLink } from "react-router-hash-link";
import {
  Trending,
  ComingSoon,
  HeroSection,
  Category,
  TopRated,
} from "../Components";
import { useDispatch } from "react-redux";
import {
  LuHome,
  IoMdTrendingUp,
  MdOutlineCategory,
  MdOutlineMovieFilter,
} from "../icons/index";
// import "./Home.css";
import { useState, useEffect } from "react";
import service from "../services/service";
import { setMovieCategory, setTvCategory } from "../store/categorySlice";
// import Loader from "./Loader/Loader";
import { Loader } from "./index";
export default function Home() {
  const [heroSlider, setHeroSlider] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  // const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [activeNavbar, setActiveNavbar] = useState({
    home: true,
    trending: false,
    category: false,
    topRated: false,
  });

  const dispatch = useDispatch();

  function handleFreeToWatch(e) {
    document.querySelectorAll(".freeToWatch").forEach((filter) => {
      filter.classList.remove("px-8", "rounded-full", "py-1", "bg-slate-500");
    });
    e.currentTarget.classList.add(
      "px-8",
      "rounded-full",
      "py-1",
      "bg-slate-500"
    );
  }

  // api calls
  useEffect(() => {
    service.nowPlaying().then((data) => {
      if (data) {
        setHeroSlider(data);
        setPageLoader(false);
      }
    });

    // service.getMovieID("1112547").then((data) => {
    //   console.log("data", data);
    // });

    // service.getUpcomingMovies().then((data) => {
    //   if (data) {
    //     setUpcomingMovies(data);
    //   }
    // });

    try {
      const localMovieCategoryData = localStorage.getItem("movieGenres");
      const localTvCategoryData = localStorage.getItem("tvGenres");

      if (localMovieCategoryData && localTvCategoryData) {
        const parsedMovieData = JSON.parse(localMovieCategoryData);
        const parsedTVData = JSON.parse(localTvCategoryData);
        if (parsedMovieData && parsedTVData) {
          dispatch(setMovieCategory(parsedMovieData));
          dispatch(setTvCategory(parsedTVData));
        }
      } else {
        service.getMovieCategoriesList().then((data) => {
          // console.log('data re called')
          dispatch(setMovieCategory(data));
          localStorage.setItem("movieGenres", JSON.stringify(data));
        });

        service.getTvCategoriesList().then((data) => {
          if (data) {
            dispatch(setTvCategory(data));
            localStorage.setItem("tvGenres", JSON.stringify(data));
          }
        });
      }
    } catch (error) {
      console.log("error in home page", error);
    }

    // const url=`https://image.tmdb.org/t/p/original/${'wwemzKWzjKYJFfCeiB57q3r4Bcm.png'}`
    // console.log('url',url);
  }, []);

  // if (heroSlider.length > 0 )
  if (!pageLoader && heroSlider.length > 0) {
    return (
      <div
        // id="home"
        className=" h-screen bg-slate-950 w-full overflow-y-auto no-scrollbar overflow-x-hidden"
        style={{ fontFamily: "Syne,sans-serif" }}
      >
        <div id="home"></div>

        {/* nav bar */}
        <nav className="w-full z-[999] nav backdrop-blur-xl   h-16  mx-auto text-white flex justify-between items-center md:px-20 md:top-0 bottom-0 left-0  fixed">
          <img
            className="md:inline-block hidden h-[60px] rounded-full "
            src="https://ik.imagekit.io/8fgpvoiai/MoviePad/logo_AJ6b_EJh1?updatedAt=1704817030405"
            alt=""
          />
          {/* <h2 className="text-xl ">Logo Here</h2> */}

          {/* nav content */}
          <ul className="flex md:gap-10 gap-2 text-lg font-bold items-center  w-full md:w-[50%] justify-between px-5 md:px-0">
            <li>
              <NavHashLink
                smooth
                to={"/#home"}
                onClick={(e) =>
                  setActiveNavbar({
                    home: true,
                    trending: false,
                    category: false,
                    topRated: false,
                  })
                }
                className={`${
                  activeNavbar.home ? "text-red-500 font-bold " : ""
                } flex flex-col gap-2 md:gap-0`}
              >
                {/* nav content */}
                <div className="transition-all ease-linear duration-500">
                  <h1 className="hidden md:inline-block">Home</h1>{" "}
                  <h1 className="md:hidden text-2xl">
                    <LuHome />
                  </h1>
                </div>
                <h2
                  className={` transition-all duration-500 ease-linear  ${
                    activeNavbar.home
                      ? "md:w-full  w-0 mx-auto md:mx-0  border border-slate-100/60"
                      : "w-0 border-none mx-auto"
                  }`}
                ></h2>
              </NavHashLink>
            </li>

            <li>
              <NavHashLink
                smooth
                to={"/#trending"}
                onClick={() =>
                  setActiveNavbar({
                    home: false,
                    trending: true,
                    category: false,
                    topRated: false,
                  })
                }
                className={`${
                  activeNavbar.trending ? "text-red-500 font-bold " : ""
                } flex flex-col`}
              >
                <div className="transition-all ease-linear duration-500">
                  <h1 className="hidden md:inline-block">Trending</h1>{" "}
                  <h1 className="md:hidden text-2xl">
                    <IoMdTrendingUp />
                  </h1>
                </div>

                <h2
                  className={` transition-all duration-500 ease-linear  ${
                    activeNavbar.trending
                      ? "md:w-full w-0 mx-auto md:mx-0  border border-slate-100/60"
                      : "w-0 border-none mx-auto"
                  }`}
                ></h2>
              </NavHashLink>
            </li>
            <li>
              <NavHashLink
                smooth
                to={"/#category"}
                onClick={() =>
                  setActiveNavbar({
                    home: false,
                    trending: false,
                    category: true,
                    topRated: false,
                  })
                }
                className={`${
                  activeNavbar.category ? "text-red-500 font-bold " : ""
                } flex flex-col`}
              >
                <div className="transition-all ease-linear duration-500">
                  <h1 className="hidden md:inline-block">Category</h1>{" "}
                  <h1 className="md:hidden text-2xl">
                    <MdOutlineCategory />
                  </h1>
                </div>

                <h2
                  className={` transition-all duration-500 ease-linear  ${
                    activeNavbar.category
                      ? "md:w-full  w-0 mx-auto md:mx-0  border border-slate-100/60"
                      : "w-0 border-none mx-auto"
                  }`}
                ></h2>
              </NavHashLink>
            </li>
            <li>
              <NavHashLink
                smooth
                to={"/#topRated"}
                onClick={() =>
                  setActiveNavbar({
                    home: false,
                    trending: false,
                    category: false,
                    topRated: true,
                  })
                }
                className={`${
                  activeNavbar.topRated ? "text-red-500 font-bold " : ""
                } flex flex-col`}
              >
                <div className="transition-all ease-linear duration-500">
                  <h1 className="hidden md:inline-block">Top Rated</h1>{" "}
                  <h1 className="md:hidden text-2xl">
                    <MdOutlineMovieFilter />
                  </h1>
                </div>
                <h2
                  className={` transition-all duration-500 ease-linear  ${
                    activeNavbar.topRated
                      ? "md:w-full  w-0 mx-auto md:mx-0  border border-slate-100/60"
                      : "w-0 border-none mx-auto"
                  }`}
                ></h2>
              </NavHashLink>
            </li>
          </ul>
        </nav>

        {/* hero section wrapper */}
        <HeroSection />

        {/* trending and other section */}
        <div id="trending" className=" relative text-white  no-scrollbar">
          {/* background vector section */}
          <div className="">
            <div className="absolute top-[0%]   -left-[15%] bg-center  bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

            <div className="absolute top-[0%]  right-[0%]  bg-center  bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

            <div className="absolute top-[65%]  left-[1%] bg-center  bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

            <div className="absolute bottom-[0%]  right-[10%] bg-center hidden border bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
            <div className="absolute bottom-[20%]  right-[50%] bg-center  hidden bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
          </div>

          {/* trending section */}
          <Trending />

          {/* coming soon section */}
          <ComingSoon />
        </div>

        {/* category */}
        <Category />

        {/* top to Watch section */}
        <TopRated />
      </div>
    );
  } else {
    return <Loader />;
  }
}
