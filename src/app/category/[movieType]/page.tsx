"use client";
import Header from "@/components/Header";
import Paginations from "@/components/Pagination";
import Star from "@/components/Star";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  backdrop_path: string;
  id: number;
  poster_path: string;
};

export default function Home() {
  const { movieType } = useParams();
  const [movie, setMovie] = useState<Movie[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const getPopular = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${page}&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result = await response.json();
      setMovie(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
  }, [searchParams]);

  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", (Number(page) + 1).toString());
    router.push(`/category/${movieType}?${params.toString()}`);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <Header />
        <div className="w-2/3 text-foreground text-2xl font-semibold  mt-1 mb-4">
          {movieType}
        </div>
        <div className="flex gap-6 flex-wrap w-[1280px]">
          {movie?.map((element, index) => (
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
          <Paginations onClick={onClick} page={page}/>
        </div>
      </div>
    </>
  );
}
