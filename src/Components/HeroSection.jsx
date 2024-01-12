import { useEffect, useState } from "react";
import { HeroSlider } from "./";
import service from "../services/service";
import { updateStatus, clearStatus } from "../store/errorSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HeroSection() {
  const [heroSlider, setHeroSlider] = useState([]);
  const[contentLoader,setContentLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    service.nowPlaying().then((data) => {
      if (data) {
        setHeroSlider(data);
        setContentLoader(false)
      }
    }).catch((error) => {
      dispatch(updateStatus(error.message));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
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
