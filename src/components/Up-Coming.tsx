import Star from "./Star";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

type ComingProps = {
  setClick: Dispatch<SetStateAction<boolean>>;
};
type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  backdrop_path: string;
};
export const Coming = (props: ComingProps) => {
  const { setClick } = props;
  const [coming, setComing] = useState<Movie[]>([]);

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
  const onClick = () => {
    console.log("hello");
    setClick(true);
  };
  const seeMore = () => {
    console.log("hell");
  };
  console.log("coming", coming);
  useEffect(() => {
    getUpComing();
  }, []);
  return (
    <>
      <div className="page-primary py-8 lg:py-13 space-y-8 lg:space-y-13">
        <div className="flex justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Up Coming</h3>
          <h3 onClick={seeMore} className="cursor-pointer">
            see more
          </h3>
        </div>
        <div className="flex gap-6 flex-wrap w-[1280px] mt-6 ">
          {coming.slice(0, 10).map((element, index) => (
            <div
              key={index}
              className=" w-[236.5px] rounded-lg overflow-hidden cursor-pointer"
              onClick={onClick}
            >
              <img
                className=" h-[340px] object-cover"
                src={`https://image.tmdb.org/t/p/original${element.backdrop_path}`}
              />
              <div className="h-[96px] bg-gray-200 p-2 text-extrabold">
                <p className="flex text-foreground text-sm items-center gap-x-1">
                  <Star /> {element.vote_average}
                  <span className="text-muted-foreground text-xs">/10</span>
                </p>
                <p className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                  {element.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
