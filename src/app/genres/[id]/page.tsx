"use client";
import Header from "@/components/Header";
import Paginations from "@/components/Pagination";
import Star from "@/components/Star";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import page from "../../details/page";
import Link from "next/link";

type movie={
  vote_average: number;
  overview: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  id: string;
  name:string;
  poster_path: string;
  genres: { name: string }[];
  cast:{ name: string }[];
  results:{id:string, poster_path:string, vote_average: number, title: string }[];
}
const Genres = () => {
  const [clickedGenre, setClickedGenre] = useState<movie[] | undefined>();
  const [genreMovie, setGenreMovie] = useState<movie[]>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ids = searchParams.get("genres")
    ? searchParams.get("genres")?.split(",")
    : [];
  const page = searchParams.get("page") || "1";
  const getClickedGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result = await response.json();
      setClickedGenre(result.genres);
    } catch (error) {
      console.log(error);
    }
  };
  const getGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${ids}&page=${page}&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result = await response.json();
      setGenreMovie(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  

  const onClick1 = (id:string) => {
    const params = new URLSearchParams(searchParams.toString());
    ids?.push(id);
    if (ids){
      params.set("genres", ids.join(","));
    }
    // params.set("genres", ids.join(","));
    router.push(`?${params.toString()}`);
  };

  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (Number(page) + 1).toString());
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
    getClickedGenres();
    getGenres();
  }, [searchParams]);
  return (
    <Suspense>
      <div className=" flex items-center flex-col w-full">
        <Header />
        <div className="xl:flex justify-between w-3/4 mt-20 pl-16">
        <div className="flex flex-col">
            <div className="flex flex-col gap-3 p-3">
              <h3 className="text-foreground text-2xl font-semibold">Genres</h3>
              <div className="text-extrabold">See lists of movies by genre</div>
            </div>
          <div className="flex w-full gap-3 p-4 md:grid-cols-2 xl:w-[400px] flex-wrap cursor-pointer justify-start h-fit">
            {clickedGenre?.map((element:movie, index) => (
              <div
                className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full cursor-pointer"
                key={index}
                onClick={() => onClick1(element.id)}
              >
                {element.name}
                <ChevronRight className="w-3" />
              </div>
            ))}
          </div>
          </div>
          <div className="flex-1 space-y-8 pt-6 border-t xl:pr-12 xl:border-l border-t-0 px-6">
            <div className="flex flex-wrap gap-5 xl:gap-x-4 xl:gap-y-8">
              {genreMovie?.map((element, index) => (
                <Link
                  href={`/details/${element.id}`}
                  key={index}
                  className=" group w-[457.5px] overflow-hidden rounded-lg lg:w-[230px]"
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
              <Paginations onClick={onClick} page={page} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Genres;
