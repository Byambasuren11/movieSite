"use client";
import Header from "@/components/Header";
import Paginations from "@/components/Pagination";
import Star from "@/components/Star";
import { ChevronRight, SearchCode } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Genres = () => {
  const [clickedGenre, setClickedGenre] = useState();
  const [genreMovie, setGenreMovie]=useState();
  const router=useRouter();
  const searchParams=useSearchParams();
  const ids=(searchParams.get("genres") || "")?.split(",")
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
      setGenreMovie(result.genres);
    } catch (error) {
      console.log(error);
    }
  };
  const onClick1 = (id) => {
    const params = new URLSearchParams(searchParams.toString());
   ids.push(id);
    params.set("genres",ids?.join(","));
    console.log(params.toString());
    router.push(`?${params.toString()}`);
  };
  console.log(ids)
  useEffect(() => {
    getClickedGenres();
    getGenres();
  }, []);
  return (
    <>
      <div className=" flex items-center flex-col">
        <Header />
        <div>
          <div className="flex w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px] flex-wrap cursor-pointer justify-start">
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
        </div>
        <div>
        
        </div>
      </div>
    </>
  );
};
export default Genres;
