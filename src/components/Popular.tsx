import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Star from "./Star";
import Link from "next/link";

type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  backdrop_path: string;
  id:number;
  poster_path:string;
};

const Popular = () => {
  const [popular, setPopular] = useState<Movie[]>([]);

  const getPopular = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03"
      );
      const result = await response.json();
      setPopular(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("popular", popular);
  useEffect(() => {
    getPopular();
  }, []);
  return (
    <>
      <div className="page-primary py-8 lg:py-13 space-y-8 lg:space-y-13">
        <div className="flex justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Popular</h3>
          <Link href={`/category/popular`}><h3 className="cursor-pointer">see more</h3></Link>
        </div>
        <div className="flex gap-6 flex-wrap w-[1280px] mt-6 ">
          {popular.slice(0, 10).map((element, index) => (
            <Link
              href={`/details/${element.id}`}
              key={index}
              className=" w-[236.5px] rounded-xl overflow-hidden"
            >
              <img
                className=" h-[340px] w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default Popular;
