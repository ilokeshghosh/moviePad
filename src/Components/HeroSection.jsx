import { useEffect, useState } from "react";
import { HeroSlider } from "./";
import service from "../services/service";

export default function HeroSection() {
  const [heroSlider, setHeroSlider] = useState([]);
  useEffect(() => {
    service.nowPlaying().then((data) => {
      if (data) {
        setHeroSlider(data);
      }
    });
  }, []);

  if (heroSlider.length > 0) {
    return (
      <div className="w-full h-screen flex items-end  text-white ">
        <HeroSlider sliderData={heroSlider} />
      </div>
    );
  }
}
