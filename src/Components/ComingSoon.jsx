import { useEffect, useState } from "react";
import service from "../services/service";
import { MovieSlider } from "./";
import { useDispatch} from "react-redux";
import { updateStatus, clearStatus } from "../store/errorSlice";
export default function ComingSoon() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    service.getUpcomingMovies().then((data) => {
      if (data) {
        setUpcomingMovies(data);
      }
    }).catch((error) => {
      dispatch(updateStatus(error.message));
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    });
  }, []);

  if (upcomingMovies.length > 0) {
    return (
      <div className="flex flex-col pt-20 gap-5 py-14 ">
        <h2 className="text-4xl font-bold px-10 w-full text-center md:text-start">
          Coming Soon
        </h2>

        {/* slider  */}
        <div className=" w-full z-50">
          <MovieSlider slideData={upcomingMovies} />
        </div>
      </div>
    );
  }
}
