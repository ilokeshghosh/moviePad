import Slider from "../Components/HeroSlider";
import MovieSlider from "../Components/MovieSlider";
// import "./Home.css";
import { useState, useEffect } from "react";
export default function Home() {
  function handleCategory(e) {
    document.querySelectorAll(".filter").forEach((filter) => {
      filter.classList.remove(
        "md:px-6",
        "px-3",
        "rounded-full",
        "py-1",
        "bg-slate-500"
      );
    });
    e.currentTarget.classList.add(
      "md:px-6",
      "px-3",
      "rounded-full",
      "py-1",
      "bg-slate-500"
    );
  }

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
  return (
    <div id="home"
      className=" h-screen bg-slate-950 w-full overflow-y-auto no-scrollbar"
      style={{ fontFamily: "Syne,sans-serif" }}
    >
      {/* nav bar */}
      <nav className="w-full z-[999]  backdrop-blur-xl   h-14 mx-auto text-white flex justify-between items-center md:px-20 md:top-0 bottom-0 left-0  fixed">
        <h2 className="text-xl md:inline-block hidden">Logo Here</h2>

        {/* nav content */}
        <ul className="flex md:gap-10 gap-2 text-lg font-bold items-center  w-full md:w-[50%] justify-between px-5 md:px-0">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#trending">Trending</a>
          </li>
          <li>
            <a href="#category">Category</a>
          </li>
          <li>
            <a href="#freeToWatch">Free To Watch</a>
          </li>
        </ul>
      </nav>

      {/* content wrapper */}
      <div className="w-full h-screen flex items-end  text-white ">
        <Slider />
      </div>

      {/* trending and other section */}
      <div id="trending" className=" relative text-white ">
        {/* background vector section */}
        <div>
          <div className="absolute top-[0%]  -left-[15%] bg-center  bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

          <div className="absolute top-[0%] right-[0%]  bg-center  bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

          <div className="absolute top-[65%]  left-[1%] bg-center  bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

          <div className="absolute bottom-[0%]  right-[10%] bg-center hidden border bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
          <div className="absolute bottom-[20%]  right-[50%] bg-center  hidden bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
        </div>

        {/* trending section */}
        <div className=" flex flex-col pt-20 gap-5">
          <h2 className="text-4xl font-bold px-10 w-full text-center md:text-start">
            Trending
          </h2>

          {/* slider  */}
          <div className=" w-full">
            <MovieSlider />
          </div>
        </div>

        {/* coming soon section */}
        <div className="flex flex-col pt-20 gap-5">
          <h2 className="text-4xl font-bold px-10 w-full text-center md:text-start">
            Coming Soon
          </h2>

          {/* slider  */}
          <div className=" w-full z-50">
            <MovieSlider />
          </div>
        </div>
      </div>

      {/* category */}
      <div id="category" className="relative h-screen text-white pt-20">
        {/* background vectors */}
        <div>
          <div className="absolute top-[60%] hidden xl:inline-block -left-[15%]  z-0 bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
          <div className="absolute -bottom-[10%]  z-0  xl:inline-block   right-[2%] bg-center bg-no-repeat bg-cover  h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
        </div>

        {/* category section */}
        <div className="w-full h-screen z-[10] flex flex-col gap-10  ">
          {/* filter bar */}
          <div
            className=" md:w-[80%]  bg-black z-50  mx-auto rounded-full h-14"
            style={{ zIndex: "" }}
          >
            <ul className="w-full flex justify-between md:px-10 px-2 gap-2 overflow-x-auto no-scrollbar  md:text-2xl text-xs items-center h-full">
              <li
                className="filter h-full w-[14%] md:px-6 px-3 rounded-full py-1 bg-slate-500 cursor-pointer selection:bg-transparent flex justify-center items-center"
                onClick={handleCategory}
              >
                Drama
              </li>

              <li
                className="filter h-full w-[14%] cursor-pointer selection:bg-transparent flex justify-center items-center"
                onClick={handleCategory}
              >
                Fantasy
              </li>

              <li
                className="filter h-full w-[14%] cursor-pointer selection:bg-transparent flex justify-center items-center"
                onClick={handleCategory}
              >
                Superhero
              </li>

              <li
                className="filter h-full w-[14%] cursor-pointer selection:bg-transparent flex justify-center items-center"
                onClick={handleCategory}
              >
                Sitcom
              </li>
              <li
                className="filter h-full w-[14%] cursor-pointer selection:bg-transparent flex justify-center items-center"
                onClick={handleCategory}
              >
                Thriller
              </li>
              <li
                className="filter h-full w-[14%] cursor-pointer selection:bg-transparent flex justify-center items-center"
                onClick={handleCategory}
              >
                Comedy
              </li>
            </ul>
          </div>

          {/* lower section */}
          <div className="flex flex-wrap gap-10 md:px-10  overflow-x-auto no-scrollbar justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (index) => (
                <div
                  key={index}
                  className="w-[400px] h-[400px] cursor-pointer mx-auto  z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  }}
                >
                  {" "}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* free to Watch section */}
      <div id="freeToWatch" className="relative  text-white mt-52 pt-20 pb-20 md:pb-0">
        {/* background vectors */}
        <div>
          <div className="absolute top-[60%]  inline-block   -left-[15%] bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
          <div className="absolute -bottom-[10%]   z-10   right-[2%] bg-center bg-no-repeat bg-cover  h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
        </div>

        {/* category section */}
        <div className="w-full h-screen z-50  flex flex-col gap-10">
          {/* filter bar container */}
          <div className=" w-full items-center  justify-start flex flex-col md:flex-row md:gap-10 px-10 gap-3">
            <h2 className=" text-4xl w-[80%] md:w-[30%] xl:w-[20%]">Free To Watch</h2>
            {/* filter bar */}
            <div
              className="xl:w-[20%] md:w-[30%] w-full   bg-black z-[100]   rounded-full h-14 flex justify-center items-center"
              style={{ zIndex: "" }}
            >
              <ul className="xl:w-[80%]  w-full  flex justify-between px-10  text-2xl items-center h-full">
                <li
                  className="freeToWatch h-full w-1/2 px-6 rounded-full py-1 bg-slate-500 cursor-pointer selection:bg-transparent flex justify-center items-center"
                  onClick={handleFreeToWatch}
                >
                  Movies
                </li>

                <li
                  className="freeToWatch h-full w-1/2 cursor-pointer selection:bg-transparent flex justify-center items-center"
                  onClick={handleFreeToWatch}
                >
                  TV
                </li>
              </ul>
            </div>
          </div>

          {/* lower section */}
          <div className="flex flex-wrap gap-10 md:px-10 overflow-x-auto no-scrollbar justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={index}
                className="w-[400px] h-[400px] cursor-pointer mx-auto  z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                }}
              >
                {" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
