import { Link } from 'react-router-dom'
import {FcBrokenLink,HiOutlineRocketLaunch } from '../icons'
export default function Error(){
    return<div 
    className="h-screen w-screen relative bg-center bg-cover bg-no-repeat  bg-[url(https://ik.imagekit.io/8fgpvoiai/MoviePad/3658975_rx4QO1kABF.jpg?updatedAt=1705054809308)] z-[10] flex justify-center items-center "
    style={{ fontFamily: "Syne,sans-serif" }}
    >
        
        <div className="absolute top-0 left-0 h-full w-full bg-slate-900/50 backdrop-blur z-[-1]">
        </div>

        {/* content */}
        <div className=' w-full flex justify-center items-center flex-col selection:bg-transparent gap-4'>
            <div className='bg-slate-900/70 px-10 rounded-xl'>
            <img className='h-[200px] w-[200px] ' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="" />
            </div>

            <div className='text-white w-full  flex flex-col items-center'>
            <h1 className='text-red-500 text-6xl font-extrabold'>404 Error </h1>
            <h1 className='text-2xl text-center md:w-[40%] font-bold'>Wisdom not found. The universe is vast, but this page seems to be lost in its own thoughts. Let's redirect you to a place where brilliance awaits. Meanwhile, enjoy this moment of cosmic confusion!"</h1>
            </div>

            <Link
            to={'/'}
            className='text-white flex justify-center items-center gap-1 text-xl bg-slate-900/50 px-10 py-2 rounded-xl font-bold'
            >
            Explore <span className='text-yellow-400/80'>Cosmos</span> <HiOutlineRocketLaunch className='text-3xl text-green-600/70'/>
            </Link>

        </div>


    </div>
}