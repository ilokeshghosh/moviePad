import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  AiOutlineSwapLeft,
  AiOutlineSwapRight,
  TiStarFullOutline,
} from "../icons";
import { data } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { setMovieCategory } from "../store/categorySlice";
export default function MovieSlider({ slideData }) {
  const genresList = useSelector((state) => state.categories.movieCategory);
  const dispatch = useDispatch();
  // const [slides, setSlides] = useState(data);
  const [slides, setSlides] = useState(slideData);
  const [current, setCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imagesPerPage, setImagePerPage] = useState(5);

  const [cardWidth, setCardWidth] = useState(
    window.innerWidth < 600 ? window.innerWidth : 400
  );
  // const length = slides.length;

  const imagesPerPageDesktop = 5;
  const imagesPerPageMobile = 1;

  function previous() {
    const newCurrent = current - imagesPerPage;

    setCurrent(newCurrent < 0 ? slides.length - imagesPerPage : newCurrent);
  }

  function next() {
    const newCurrent = current + imagesPerPage;
    setCurrent(newCurrent >= slides.length ? 0 : newCurrent);
  }

  function getImagesPerPage() {
    // Determine the number of images to display based on screen width
    return window.innerWidth < 600 ? 1 : 5;
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setImagePerPage(getImagesPerPage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setImagePerPage(getImagesPerPage());
    setCardWidth(window.innerWidth < 600 ? window.innerWidth : 400);
  }, [window.innerWidth]);

  useEffect(() => {
    if (genresList.length <= 0) {
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
    if (genresList) {
      arrayIds.forEach((id) => {
        const data = genresList.find((genre) => {
          if (genre.id === id) {
            return genre.name;
          }
        });

        result.push(data);
      });
    }
    return result;
  }

  useEffect(() => {
    // console.log('est',slides);
    // slides.map((slide)=>{
    //   console.log('slide',new Date(slide.release_date).getDay());
    // })
  }, [slides]);

  if (slides.length > 0) {
    return (
      <div className="w-full relative h-full flex  items-end ">
        {/* buttons */}
        <div className=" flex flex-row-reverse absolute justify-between w-full px-20 -bottom-14">
          {/* next  */}
          <div
            className="text-xl flex  justify-center items-center cursor-pointer selection:bg-transparent"
            onClick={next}
          >
            <h2 className="text-xl">Next</h2>
            <AiOutlineSwapRight className="text-4xl" />
          </div>

          {/* previous */}
          <div
            className=" flex  justify-center items-center cursor-pointer selection:bg-transparent"
            onClick={previous}
          >
            <AiOutlineSwapLeft
              className="text-4xl "
              style={{ transform: "rotateX(180deg)" }}
            />
            <h2 className="text-xl">Previous</h2>
          </div>
        </div>
        {/* image slider container*/}
        <div className="  w-full     py-0 ">
          {/* image slider section */}
          <div
            className={`w-full  flex items-center      justify-start   transition-transform duration-1000 ease-in-out `}
            style={{
              transform: `translateX(-${
                current * (100 / getImagesPerPage())
              }%)`, // Adjust the translation based on the number of cards

              // transform: `translateX(-${window.innerWidth<600? `${current * (100 / getImagesPerPage())}%`:''})`, // Adjust the translation based on the number of cards
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${
                  windowWidth < 600 ? "w-full" : `w-[${100 / imagesPerPage}%]`
                }   flex-shrink-0  flex justify-center items-center selection:bg-transparent px-2`}
              >
                {index >= current && index <= current + imagesPerPage - 1 && (
                  <>
                    <Link
                      className="md:w-[400px] w-screen  h-[400px]  hover:scale-110 transition-all ease-linear duration-200   z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                      to={`/movie/${slide.id}`}
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${slide.backdrop_path})`,
                      }}
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
                              {slide.vote_average.toFixed(1)}
                            </h2>
                          </div>
                        </div>

                        {/* lower section */}
                        <div className="flex flex-col w-full  justify-start items-start gap-2 ">
                          {/* name */}
                          <h1 className="w-full text-2xl font-bold">
                            {slide.title}
                          </h1>

                          <h2>{`${
                            new Date(slide.release_date).getDay() + 1 < 10
                              ? "0"
                              : ""
                          }${new Date(slide.release_date).getDay() + 1} / ${
                            new Date(slide.release_date).getMonth() + 1 < 10
                              ? "0"
                              : ""
                          }${
                            new Date(slide.release_date).getMonth() + 1
                          }/ ${new Date(
                            slide.release_date
                          ).getFullYear()}`}</h2>

                          {/* genres */}
                          <div className="flex gap-4 items-center text-xs w-full font-bold">
                            {getGenreName(slide.genre_ids).map((genre) => (
                              <h2 key={genre.id}>{genre.name}</h2>
                            ))}
                          </div>

                          <h2 className="text-lg font-bold tracking-widest bg-white/20 px-4 rounded-lg text-center">
                            {slide.original_language}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
