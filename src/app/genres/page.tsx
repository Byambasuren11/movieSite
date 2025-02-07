"use client";
import Header from "@/components/Header";
import Paginations from "@/components/Pagination";
import Star from "@/components/Star";
import { ChevronRight, SearchCode } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import page from "../details/page";
import Link from "next/link";

const Genres = () => {
  const [clickedGenre, setClickedGenre] = useState();
  const [genreMovie, setGenreMovie] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ids = searchParams.get("genres") ? searchParams.get("genres")?.split(',') : "[]"
  const page = (searchParams.get("page") || "1");
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
  const onClick1 = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    ids.push(id);
    if(ids?.includes(id)){
      
    }
    params.set("genres", ids?.join(","));
    console.log(params.toString());
    router.push(`?${params.toString()}`);
  };
  
  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (Number(page) + 1).toString());
    router.push(`?${params.toString()}`);
    console.log(params.toString());
  };
  console.log("clic", genreMovie);
  useEffect(() => {
    getClickedGenres();
    getGenres();
  }, [searchParams]);
  return (
    <>
      <div className=" flex items-center flex-col">
        <Header />
        <div className="flex justify-between w-[1300px] mt-20">
          <div className="flex w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px] flex-wrap cursor-pointer justify-start h-fit">
            {clickedGenre?.map((element, index) => (
              <div
                className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs w-fit"
                key={index}
                onClick={() => onClick1(element.id)}
              >
                {element.name}
                <ChevronRight className="w-3" />
              </div>
            ))}
          </div>
          <div className="flex gap-6 flex-wrap w-[800px]">
            {genreMovie?.map((element, index) => (
              <Link
                href={`/details/${element.id}`}
                key={index}
                className=" w-[180.5px] rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  className=" h-[230px] w-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
                />
                <div className="h-[96px] bg-gray-200 p-2 text-extrabold">
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
    </>
  );
};
export default Genres;
