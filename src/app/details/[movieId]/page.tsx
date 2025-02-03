"use client";
import Header from "@/components/Header";
import Star from "@/components/Star";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  id: number;
};

export default function Home() {
  const { movieId } = useParams();
  // console.log(id);
  const [clickedMovie, setClickedMovie] = useState<Movie>({} as Movie);
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const getClickedMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result = await response.json();
      console.log(result);
      setClickedMovie(result);
    } catch (error) {
      console.log(error);
    }
  };
  const getDirector = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result = await response.json();
      console.log(result);
      setMovie(result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("dsdsad", clickedMovie);
  useEffect(() => {
    getClickedMovie();
    getDirector();
  }, []);
  console.log("dcd", movie);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-[1080px] mt-20 flex flex-col gap-5">
        <div className="flex w-full justify-between">
          <div>
            <div className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
              {clickedMovie.title}
            </div>
            <div>{clickedMovie.release_date}</div>
          </div>
          <p className="flex text-foreground text-sm items-center gap-x-1">
            <Star /> {clickedMovie.vote_average}
            <span className="text-muted-foreground text-xs">/10</span>
          </p>
        </div>
        <div className="flex justify-between ">
          <div className="w-[280px] h-[428px] bg-black rounded-sm overflow-hidden">
            <img
              className="h-[428px] object-cover"
              src={`https://image.tmdb.org/t/p/original${clickedMovie.poster_path}`}
            />
          </div>
          <div className="w-[760px] h-[428px] bg-black">
            {" "}
            <img
              className="h-[428px] object-cover"
              src={`https://image.tmdb.org/t/p/original${clickedMovie.backdrop_path}`}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {clickedMovie.genres?.map((element, index) => (
            <div
              key={index}
              className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs w-fit"
            >
              {element.name}
            </div>
          ))}
        </div>
        <div className="text-base">{clickedMovie.overview}</div>
        <div className="flex flex-col space-y-5 text-foreground mb-8">
          <div className=" font-bold w-16 mr-13 border-b">zoh</div>
          <div className=" font-bold w-16 mr-13">writers</div>
          <div className="flex">
            <div className=" font-bold w-16 mr-13 flex">Stars</div>
            <div className="flex gap-10">
              {movie.cast?.slice(0, 5)?.map((element, index) => (
                <ul className="flex items-center" key={index}>
                  {element.name}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <h3 className="text-foreground text-2xl font-semibold">
            More like this
          </h3>
          <h3 className="cursor-pointer">see more</h3>
        </div>
      </div>
    </div>
  );
}
