
'use client'
import Header from "@/components/Header";
import Star from "@/components/Star";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  backdrop_path: string;
  id: number;
  poster_path:string;
};

export default function Home () {
      const { movieType } = useParams();
      const [movie, setMovie] = useState<Movie[]>([]);
      const getPopular = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
          );
          const result = await response.json();
          setMovie(result.results);
        } catch (error) {
          console.log(error);
        }
      };
      console.log(movie)
    useEffect(() => {
        getPopular();
      }, []);
    return(<>
    <div className="w-full flex flex-col justify-center items-center">
    <Header/>
    <div className="flex gap-6 flex-wrap w-[1280px] mt-6 ">
          {movie.map((element, index) => (
            <Link
              href={`/details/${element.id}`}
              // ID={id}
              key={index}
              className=" w-[236.5px] rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                className=" h-[340px] w-full object-cover"
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
        </div>
        </div>
    </>)
}