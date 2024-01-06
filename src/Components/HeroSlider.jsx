import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "../icons";
import { data } from "./data";
import service from "../services/service";
export default function HeroSlider({sliderData}) {
  const [slides, setSlides] = useState(sliderData);
  const [current, setCurrent] = useState(0);

  function previous() {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  }

  function next() {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  // useEffect(()=>{
  //  console.log('sliderdata',sliderData);
  // },[slides])



  if (slides.length > 0) {
    return (
      <div className="w-full relative h-full flex  items-end">
        {/* buttons */}
        <div className="absolute z-10 w-full h-[90%]  left-0 top-[10%] flex justify-between ">
          <div onClick={previous} className="text-3xl  w-1/2">
            <FaChevronLeft className="hidden" />
          </div>
          <div onClick={next} className="text-3xl w-1/2">
            <FaChevronRight className="hidden" />
          </div>
        </div>

        {/* image slider container*/}
        <div className="  w-full    flex py-0 ">
          {/* image slider section */}
          <div className="md:w-[300px]  md:h-[450px] w-[200px] h-[350px]   mx-auto ">
            {slides.map((slide, index) => (
              <div
                key={index}
                className=" w-full   flex justify-center items-center selection:bg-transparent"
              >
                {index === current && (
                  <>
                    {/* banner */}
                    <div
                      className={`absolute top-0  left-0 w-full h-full bg-center bg-cover bg-no-repeat `}
                      style={{
                        // backgroundImage: `url( ${slide.banner})`,
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${slide.backdrop_path})`,
                        boxShadow: "inset 0px -200px 100px 0px rgb(2 6 23)",
                      }}
                    >
                      {/* <img className="w-full h-full" src={`${slide.banner}`} alt="" /> */}
                    </div>
                    {/* image card*/}
                    <div
                      className="w-full md:h-[400px] h-[300px]    z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9 "
                      // style={{ backgroundImage: `url(${slide.url})` }}
                      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${slide.poster_path})` }}
                    >
                      <div className="absolute hidden w-full h-full top-0 left-0 bg-slate-800/40 z-[-1]"></div>
                      {" "}
                      {/*title  */}
                      <h2 className="text-4xl font-bold w-full text-center hidden">{slide.title}</h2>
                      <button className="bg-red-700 px-6 py-2 rounded-lg text-xl font-bold hidden">
                        Click Me
                      </button>
                      {/* shadow */}
                      <div
                        className="w-[120%] absolute  -bottom-10 text-center h-10  bg-center bg-cover bg-no-repeat"
                        style={{
                          backgroundImage:
                            "url(https://ik.imagekit.io/8fgpvoiai/MoviePad/card%20shadow_R3lUESlaA.png?updatedAt=1704194324494)",
                        }}
                      ></div>
                    </div>
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
