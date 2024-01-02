import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  AiOutlineSwapLeft,
  AiOutlineSwapRight,
} from "../icons";
import { data } from "./data";
export default function MovieSlider() {
  const [slides, setSlides] = useState(data);
  const [current, setCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const[imagesPerPage, setImagePerPage]= useState()
  const length = slides.length;
  const imagesPerPageDesktop = 5;
  const imagesPerPageMobile = 1;

  function previous() {
    const newCurrent = current - imagesPerPage;
    setCurrent(newCurrent < 0 ? length - imagesPerPage : newCurrent);
  }

  function next() {
    const newCurrent = current + imagesPerPage;
    setCurrent(newCurrent >= length ? 0 : newCurrent);
  }

  function getImagesPerPage() {
    // Determine the number of images to display based on screen width
    return window.innerWidth < 600 ? imagesPerPageMobile : imagesPerPageDesktop;
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





useEffect(()=>{setImagePerPage(windowWidth < 600 ? 1 : 5)},[window.innerWidth])

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
          <AiOutlineSwapLeft className="text-4xl" />
          <h2 className="text-xl">Previous</h2>
        </div>
      </div>
      {/* image slider container*/}
      <div className="  w-full     py-0 overflow-hidden">
        {/* image slider section */}
        <div
          className="w-full  flex items-center      justify-between   transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / imagesPerPage)}%)`, // Adjust the translation based on the number of cards
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-[${100 / imagesPerPage}%] ${windowWidth<600 ?'w-full':''}    flex-shrink-0  flex justify-center items-center selection:bg-transparent`}
            >
              {index >= current && index <= current + 4 && (
                <>
                  {/* image card*/}
                  <div
                    className="md:w-[400px] w-screen  h-[400px]     z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                    style={{ backgroundImage: `url(${slide.url})` }}
                  >
                    {" "}
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
