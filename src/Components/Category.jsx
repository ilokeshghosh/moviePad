import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../services/service";
export default function Category() {
    const[movies, setMovies] = useState([]);
  const categories = useSelector((state) => state.category.category);
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

    service.getMoviesListByCategories(id).then((data)=>{
        if(data){
            setMovies(data);
            console.log('action movie',data);
        }
    })
  }

  useEffect(()=>{
    const id=28;
    const genre= 'Action';
    // console.log(categories)
    service.getMoviesListByCategories(id).then((data)=>{
        if(data){
            setMovies(data);
            // console.log('action movie',data);
        }
    })
  },[])

//   useEffect(() => {
//     console.log("categories", categories);
//   }, [categories]);

  if (categories.length > 0 && movies.length>0) {
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
            {movies.map(
              (movie,index) => (
                <div
                  key={index}
                  className="w-[400px] h-[400px] cursor-pointer mx-auto  z-10 relative bg-center bg-cover bg-no-repeat flex flex-col justify-end py-4 items-center gap-9"
                  style={{
                    // backgroundImage: `url(https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                  }}
                >
                  {" "}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
