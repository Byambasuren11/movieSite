import Star from "./Star";
import { useState, useEffect } from "react";

const Coming = () => {
  const [coming, setComing] = useState([]);

  const getUpComing = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03"
      );
      const result = await response.json();
      setComing(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("coming", coming);
  useEffect(() => {
    getUpComing();
  }, []);
  return (
    <>
      <div className="page-primary py-8 lg:py-13 space-y-8 lg:space-y-13">
        <h3 className="text-foreground text-2xl font-semibold">Up Coming</h3>
        <div className="flex gap-6 flex-wrap w-[1280px] mt-6 ">
          {coming.slice(0, 10).map((element) => (
            <div className=" w-[230px] rounded-lg">
              <img
                className=" h-[340px] object-cover"
                src={`https://image.tmdb.org/t/p/original${element.backdrop_path}`}
              />
              <div className="h-[96px] bg-gray-200 p-2 text-extrabold">
                <p className="flex text-foreground text-sm items-center gap-x-1"><Star/> {element.vote_average}<span className="text-muted-foreground text-xs">/10</span></p>
                <p className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">{element.title}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Coming;
