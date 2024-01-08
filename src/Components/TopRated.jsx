import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../services/service";
import { TiStarFullOutline } from "../icons/index";
import { Link } from "react-router-dom";

export default function TopRated() {
  const genresList = useSelector((state) => state.category.category);
  const[type,setType] = useState()
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  function handleFreeToWatch(e, name) {
    document.querySelectorAll(".freeToWatch").forEach((filter) => {
      filter.classList.remove("px-8", "rounded-full", "py-1", "bg-slate-500");
    });
    e.currentTarget.classList.add(
      "px-8",
      "rounded-full",
      "py-1",
      "bg-slate-500"
    );

    service.topRated(name).then((data) => {
      if (data) {
        console.log('data from top reated',data);
        setTopRatedMovies(data);
        setType(name);
      }
    });
  }

  useEffect(() => {
    const name = "movie";
    service.topRated(name).then((data) => {
      if (data) {
        setType('movie')
        setTopRatedMovies(data);
      }
    });
  }, []);

  useEffect(()=>{
    console.log('type',type)
  },[type])

  function getGenreName(arrayIds) {
    const result = [];
    if (genresList) {
      arrayIds.forEach((id) => {
        const data = genresList.find((genre, index) => {
          if (genre.id === id && genre.name) {
            result.push(genre.name);
          }
        });
      });
    }
    // console.log('result',result);
    return result;
  }

  if (topRatedMovies.length > 0) {
    return (
      <div
        id="topRated"
        className="relative  text-white mt-52 pt-20 pb-20 md:pb-0 "
      >
        {/* background vectors */}
        <div className="">
          <div className="absolute top-[60%]  inline-block   -left-[15%] bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
          <div className="absolute -bottom-[10%]   z-10   right-[2%] bg-center bg-no-repeat bg-cover  h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
        </div>

        {/* category section */}
        <div className="w-full h-screen z-50  flex flex-col gap-10">
          {/* filter bar container */}
          <div className=" w-full items-center  justify-start flex flex-col md:flex-row md:gap-10 px-10 gap-3">
            <h2 className=" text-4xl w-[80%] md:w-[30%] xl:w-[20%]">
              Top Rated
            </h2>
            {/* filter bar */}
            <div
              className="xl:w-[20%] md:w-[30%] w-full   bg-black z-[100]   rounded-full h-14 flex justify-center items-center"
              style={{ zIndex: "" }}
            >
              <ul className="xl:w-[80%]  w-full  flex justify-between    text-2xl items-center h-full">
                <li
                  className="freeToWatch h-full w-1/2 px-6 rounded-full py-1  bg-slate-500 cursor-pointer selection:bg-transparent flex justify-center items-center"
                  onClick={(e) => handleFreeToWatch(e, "movie")}
                >
                  Movies
                </li>

                <li
                  className="freeToWatch h-full w-1/2 cursor-pointer selection:bg-transparent flex justify-center items-center"
                  onClick={(e) => handleFreeToWatch(e, "tv")}
                >
                  TV
                </li>
              </ul>
            </div>
          </div>

          {/* lower section */}
          <div className="flex flex-wrap gap-10 md:px-10 overflow-x-auto no-scrollbar justify-between">
            {topRatedMovies.map((data, index) => (
              <Link
                to={`${type ==='movie' ? `/movie/${data.id}`:`/tv/${data.id}`}`}
                key={index}
                className="w-[400px] h-[400px] cursor-pointer mx-auto  z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
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
                    <h2>{`
                      ${new Date(data.release_date).getDay() || new Date(data.first_air_date).getDate()  < 10? "0": ""}${new Date(data.release_date ).getDay() || new Date(data.first_air_date).getDate()} 
                      
                      / 
                      ${new Date(data.release_date).getMonth() || new Date(data.first_air_date).getMonth()+1 < 10? "0": ""}${new Date(data.release_date).getMonth() || new Date(data.first_air_date).getMonth()+1}
                      
                      /
                      ${new Date(data.release_date).getFullYear() || new Date(data.first_air_date).getFullYear()}`}
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
          </div>
        </div>
      </div>
    );
  }
}
