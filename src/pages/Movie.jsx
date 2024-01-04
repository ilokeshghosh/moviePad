import { useState, useEffect } from "react";
import { FaArrowDownLong } from "../icons";
import { data } from "../Components/data";
export default function Movie() {
  return (
    <div
      className="bg-slate-950 z-0 relative overflow-x-hidden no-scrollbar"
      style={{ fontFamily: "Syne,sans-serif" }}
    >
      {/* bg vectors */}
      <div className="z-[10]">
        <div className="absolute top-[30%] z-[-1]   -right-[30%]  bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>

        <div className="absolute top-[50%]   z-[-1]  -left-[3%]  bg-center bg-no-repeat bg-cover h-[900px]  w-[1000px] bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/background%20vector%202_W0k4aWxrl.png?updatedAt=1704195548285)]"></div>
      </div>

      {/* movies poster section */}
      <div
        className="bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/1345319_EUZiuCnOS.jpeg?updatedAt=1704295973308)] bg-center bg-cover bg-no-repeat h-screen text-white md:py-6  md:px-32 px-0 relative pb-10 md:pb-0"
        style={{
          boxShadow: "inset 0px -120px 100px 0px rgb(2 6 23)",
        }}
      >
        {/* cover */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/3 0 z-0 "></div>

        {/* cover */}
        <div
          className=" h-[15%]   left-0 absolute bottom-0  w-full z-[20]"
          style={{ boxShadow: "inset 0px -30px 70px 0px rgb(2 6 23)" }}
        ></div>

        {/* scroll down button */}
        <div className="absolute bottom-[36%]  left-[55%]  mx-auto text-white z-0 text-3xl animate-bounce">
          <FaArrowDownLong />
        </div>

        {/* content section */}
        <div className="absolute top-0 left-0 w-full h-full md:px-20 px-0">
          {/* upper section /title*/}
          <div className="w-full md:text-start  text-center   md:pt-10 pt-4 h-1/3 ">
            {/* title */}
            <h1 className="md:text-[7rem] text-[4rem] font-bold ">
              Rebel Moon
            </h1>
          </div>

          {/* mid section / data and stars */}
          <div className="w-full flex justify-between md:items-center items-start px-5 md:py-10 py-0 z-50 h-1/3 ">
            {/* left / date and time*/}
            <div className="w-1/2 flex flex-col justify-start items-start">
              {/* in theatres text */}
              <h3 className="text-2xl ">in theatres</h3>
              {/* month and year */}
              <div className="px-4 flex flex-col justify-between items-center text-4xl font-semibold">
                {/* month */}
                <h2>March</h2>
                <h2>2021</h2>
              </div>
            </div>

            {/* right/stars */}
            <div className="1/2 flex flex-col items-start gap-2">
              <h3 className="text-xl font-semibold ">STARRING</h3>
              <ul className="px-2 text-lg">
                <li className="">Actor 1</li>
                <li>Actor 2</li>
                <li>Actor 3</li>
                <li>Actor 4</li>
              </ul>
            </div>
          </div>

          {/* lower section / button and movie desc */}
          <div className="flex justify-start md:gap-20 gap-3 md:pt-18 z-50 h-1/3 px-1 md:px-0 ">
            {/* trailer section */}
            <div className="w-[20%] md:w-[5%]">
              <button className="border px-4 rounded-xl ">
                <a href="#trailer">Trailer</a>{" "}
              </button>
            </div>

            {/* movie information */}
            <div
              className={`md:w-[50%] w-[90%] text-center mx-auto overflow-y-auto no-scrollbar  relative `}
            >
              <h3 className="text-2xl font-light ">
                {" "}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
                natus nesciunt facilis maiores dignissimos velit corporis
                perferendis. Similique explicabo quasi autem blanditiis.
                Incidunt non accusantium corporis ipsum necessitatibus
                voluptatem nemo? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Corrupti quae aspernatur cupiditate esse
                excepturi, consectetur ipsum ipsa eligendi. Vero quasi
                repellendus doloremque? Magnam sed debitis ducimus blanditiis
                corrupti rerum repellat. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Ex culpa quidem quo cupiditate. Exercitationem
                nemo perspiciatis amet nobis rerum, voluptatibus eligendi iusto
                repudiandae aspernatur nulla quod hic possimus, suscipit dolorem
                ipsa tempore cupiditate alias. At explicabo recusandae rerum
                error cum magni reprehenderit, architecto sed dignissimos fugiat
                possimus aperiam exercitationem ullam vel temporibus quasi
                veritatis expedita ad deleniti adipisci itaque incidunt dolore
                perspiciatis. Ut doloremque praesentium tenetur, magni sint
                rerum eius laudantium esse ratione ab molestiae, impedit
                possimus exercitationem recusandae commodi iusto? Voluptate quam
                et earum cupiditate mollitia in doloremque consequuntur cum
                iusto temporibus, cumque sint facere totam obcaecati, quis
                accusamus?
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* trailer section */}
      <div
        id="trailer"
        className="h-screen  text-white md:py-1 py-20 flex flex-col  md:gap-4 gap-24  relative z-[0]"
        style={{ fontFamily: "Syne,sans-serif" }}
      >
        {/* upper section */}
        <div className="flex flex-col  items-center mgap-2  md:py-8 py-3 z-[10]">
          <h1 className="md:text-6xl text-3xl font-semibold">Rebel Moon </h1>
          {/* tags and content */}
          <div className="flex md:gap-10 gap-2 flex-wrap md:justify-center justify-between  items-center w-full ">
            <h2 className="bg-slate-500 md:px-6  px-2 rounded-md">UA</h2>
            <h3>03/24/2021(IN)</h3>
            <h3>Action,Science,Fiction</h3>
            <h3>1h 54m</h3>
          </div>
        </div>

        {/* video palyer section */}
        <div className="border border-slate-400 md:h-[70%] h-[50%] rounded-lg md:w-[60%] w-full mx-auto z-[8]">
          <iframe
            className="w-full z-[12] h-full rounded-lg"
            src="https://www.youtube.com/embed/fhr3MzT6exg?si=VrlbqVgbkS7bdrrK"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* recomanded section */}
      <div
        className="h-screen z-[10] text-white py-10 flex flex-col justify-start items-center gap-20 "
        style={{ fontFamily: "Syne,sans-serif" }}
      >
        {/* upper section */}
        <div className=" flex justify-between w-[80%] mx-auto">
          <h2 className="md:text-5xl text-3xl font-semibold">Recomanded</h2>
          <img
            className="md:w-[200px] w-[100px]"
            src="https://ik.imagekit.io/8fgpvoiai/MoviePad/quotes%20marks_HD5Th9EWh.png?updatedAt=1704369615652"
            alt=""
          />
        </div>

        {/* cards contaier*/}
        <div className="w-full flex-shrink-0   h-[80%] overflow-y-auto no-scrollbar justify-between px-10 items-center flex flex-wrap md:gap-5  gap-3 rounded-xl ">
          {[1, 2, 3, 4, 5, 6].map((index, slide) => (
            <div
              key={index}
              className={` bg-[url(https://images.unsplash.com/photo-1703875497895-0de198243647?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  ${window.innerWidth < 600 ? "w-full flex-3" : "w-1/5 flex-1"
                }  h-full bg-center bg-cover bg-no-repeat`}
            ></div>
          ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
