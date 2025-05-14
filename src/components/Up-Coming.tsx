import Star from "./Star";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  backdrop_path: string;
  id: number;
  poster_path: string;
};
export const Coming = () => {
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
  useEffect(() => {
    getUpComing();
  }, []);
  return (
    <>
      <div className="page-primary py-8 w-full lg:py-13 space-y-8 lg:space-y-13 xl:w-2/3">
        <div className="flex justify-between">
          <h3 className="text-foreground text-2xl font-semibold">Up Coming</h3>
          <Link href={`/category/upcoming`}>
            <h3 className="cursor-pointer flex">
              see more <ArrowRight className="w-4" />
            </h3>
          </Link>
        </div>
        <div className="flex flex-wrap gap-5 lg:gap-8 ">
          {coming.slice(0, 10).map((element, index) => (
            <Link
              href={`/details/${element.id}`}
              // ID={id}
              key={index}
              className=" group w-[457.5px] overflow-hidden rounded-lg lg:w-[230px]  xl:w-[260px]"
            >
              <img
                className=" h-[300px] w-full object-cover"
                src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
              />
              <div className="h-[96px] bg-gray-200 dark:bg-gray-900 p-2 text-extrabold">
                <p className="flex text-foreground text-sm items-center gap-x-1">
                  <Star /> {element.vote_average.toFixed(1)}
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
