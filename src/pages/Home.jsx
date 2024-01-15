import { NavHashLink } from "react-router-hash-link";
import {
  Trending,
  ComingSoon,
  HeroSection,
  Category,
  TopRated,
  Search,
} from "../Components";
import { useDispatch, useSelector } from "react-redux";
import {
  LuHome,
  IoMdTrendingUp,
  MdOutlineCategory,
  MdOutlineMovieFilter,
  VscErrorSmall,
  IoMdSearch,
} from "../icons/index";
import { useState, useEffect } from "react";
import service from "../services/service";
import { setMovieCategory, setTvCategory } from "../store/categorySlice";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { Loader } from "./index";
export default function Home() {
  const [heroSlider, setHeroSlider] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const errorText = useSelector((state) => state.errorReducer.errorText);
  const isError = useSelector((state) => state.errorReducer.isError);
  const dispatch = useDispatch();

  const [activeNavbar, setActiveNavbar] = useState({
    home: true,
    trending: false,
    category: false,
    topRated: false,
    search: false,
  });

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
    service
      .nowPlaying()
      .then((data) => {
        if (data) {
          setHeroSlider(data);
          setPageLoader(false);
        }
      })
      .catch((error) => {
        dispatch(updateStatus(error.message));
        setTimeout(() => {
          dispatch(clearStatus());
        }, 3000);
      });

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
      dispatch(updateStatus(error.message));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }

  }, []);

 
  if (!pageLoader && heroSlider.length > 0) {
    return (
      <div
        className=" h-screen bg-slate-950 w-full overflow-y-auto no-scrollbar overflow-x-hidden"
        style={{ fontFamily: "Syne,sans-serif" }}
      >
        <div id="home"></div>

        {/* error container */}
        <div
          className={`w-full absolute md:bottom-3 bottom-20 flex  z-[500] ${
            isError ? "" : "hidden"
          }`}
        >
          {/* error section */}
          <div className="min-w-[30%] h-18 mx-auto bg-slate-900/50 backdrop-blur rounded-lg flex justify-between items-center text-white gap-3">
            {/* right section */}
            <div className="bg-red-500 flex justify-center items-center h-full px-4">
              <VscErrorSmall className="text-6xl" />
            </div>

            {/* middle section */}
            <div className="w-full">
              <h2>{errorText}</h2>
              <div className=" w-full loadingBar"></div>
            </div>

            <span className="border h-[60%] text-slate-400"></span>
            {/*left section */}
            <div
              onClick={() => dispatch(clearStatus())}
              className="text-slate-300 text-lg font-bold px-2 cursor-pointer"
            >
              CLOSE
            </div>
          </div>
        </div>

        {/* nav bar */}
        <nav className="w-full z-[999] nav backdrop-blur-xl   h-16  mx-auto text-white flex justify-between items-center md:px-20 md:top-0 bottom-0 left-0  fixed">
          <img
            className="md:inline-block hidden h-[60px] rounded-full "
            src="https://ik.imagekit.io/8fgpvoiai/MoviePad/logo_AJ6b_EJh1?updatedAt=1704817030405"
            alt=""
          />
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
                    search: false,
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
                    search: false,
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
                    search: false,
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
                    search: false,
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
            <li>
              <NavHashLink
                smooth
                to={"/#search"}
                onClick={() =>
                  setActiveNavbar({
                    home: false,
                    trending: false,
                    category: false,
                    topRated: false,
                    search: true,
                  })
                }
                className={`${
                  activeNavbar.search ? "text-red-500 font-bold " : ""
                } flex flex-col`}
              >
                <div className="transition-all ease-linear duration-500">
                  <h1 className="hidden md:inline-block">Search</h1>{" "}
                  <h1 className="md:hidden text-2xl">
                    <IoMdSearch />
                  </h1>
                </div>
                <h2
                  className={` transition-all duration-500 ease-linear  ${
                    activeNavbar.search
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

            <div className="absolute bottom-[0%]   right-[10%] bg-center hidden border bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
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

        {/* search section */}
        <Search />
      </div>
    );
  } else {
    return <Loader />;
  }
}
