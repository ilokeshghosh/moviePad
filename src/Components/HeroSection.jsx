import { useEffect, useState } from "react";
import { HeroSlider } from "./";
import service from "../services/service";

export default function HeroSection() {
  const [heroSlider, setHeroSlider] = useState([]);
  const[contentLoader,setContentLoader] = useState(true);
  useEffect(() => {
    service.nowPlaying().then((data) => {
      if (data) {
        setHeroSlider(data);
        setContentLoader(false)
      }
    });
  }, []);

  if (heroSlider.length > 0) {
    return (
      <div className="w-full h-screen flex items-end  text-white ">
        {contentLoader ? <><div className="h-[500px] w-[400px] bg-slate-900/60 skeleton mx-auto  rounded-xl backdrop-blur-xl"></div></>:<><HeroSlider sliderData={heroSlider} /></>}
        
        
      </div>
    );
  }
}
