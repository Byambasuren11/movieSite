"use client";
import Header from "@/components/Header";
import Star from "@/components/Star";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowRight, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import ReactPlayer from "react-player";

type Movie = {
  vote_average: number;
  overview: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  id: number;
  poster_path: string;
  genres: { name: string }[];
  cast:{ name: string }[];
  results:{id:string, poster_path:string, vote_average: number, title: string }[];
};
type Video = {
  key: string;
};

export default function Home() {
  const { movieId } = useParams();
  // console.log(id);
  const [clickedMovie, setClickedMovie] = useState<Movie>({} as Movie);
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [similarMovie, setSimilarMovie] = useState<Movie>({} as Movie);
  const [video, setVideo] = useState<Video>();
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
  console.log(clickedMovie);
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
  const getVideo = async (id: number) => {
    try {
      const video = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result1 = await video.json();
      setVideo(result1.results[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const result = await response.json();
      console.log(result);
      setSimilarMovie(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClickedMovie();
    getDirector();
    getSimilarMovie();
  }, []);
  return (
    <Suspense>
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full mt-20 flex flex-col gap-5 xl:w-2/3">
        <div className="flex w-full justify-between">
          <div>
            <div className="break-words text-2xl font-bold w-52 xl:w-fit xl:text-4xl">
              {clickedMovie.title}
            </div>
            <div>{clickedMovie.release_date}</div>
          </div>
          <p className="flex text-foreground text-sm items-center gap-x-1">
            <Star /> {clickedMovie.vote_average}
            <span className="text-muted-foreground text-xs">/10</span>
          </p>
        </div>
        <div className="flex gap-x-8 mb-8 ">
          <div className="overflow-hidden relative hidden xl:block w-[290px] h-[428px] rounded">
            <img
              className="box-border block overflow-hidden opacity-100 m-0 p-0 absolute"
              src={`https://image.tmdb.org/t/p/original${clickedMovie.poster_path}`}
            />
          </div>
          <div className="relative overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
            <img
              className="h-[428px] object-cover"
              src={`https://image.tmdb.org/t/p/original${clickedMovie.backdrop_path}`}
            />
            <div className="absolute left-6 bottom-6 z-20">
              <Dialog>
                <DialogTrigger>
                  <Button
                    onClick={() => getVideo(clickedMovie.id)}
                    className=" rounded-full"
                  >
                    <PlayIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-fit max-w-4xl">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${video?.key}`}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="flex gap-x-[34px] xl:block">
          <div className="relative overflow-hidden block w-[100px] h-[148px] rounded shrink-0 xl:hidden">
            <img
              className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"
              src={`https://image.tmdb.org/t/p/original${clickedMovie.poster_path}`}
            />
          </div>
          <div className="flex flex-col gap-4">
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
          </div>
        </div>
        <div className="space-y-5 text-foreground mb-8">
          <div>
            <div className=" font-bold w-16 mr-13 border-b w-full pb-3">
              Director
            </div>
            <div className="flex gap-10"></div>
          </div>
          <div className=" font-bold w-16 mr-13 border-b w-full pb-3">
            writers
          </div>
          <div className="flex border-b w-full pb-3">
            <div className=" font-bold w-16 mr-13 flex">Stars</div>
            <div className="flex gap-10">
              {movie.cast?.slice(0, 5)?.map((element, index) => (
                <ul className="flex flex-1 flex-wrap" key={index}>
                  {element.name}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between ">
            <h3 className="text-foreground text-2xl font-semibold">
              More like this
            </h3>
            <Link className="cursor-pointer flex" href={"/category/similar"}>
              see more <ArrowRight className="w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-8">
            {similarMovie.results?.slice(0, 5)?.map((element, index) => (
              <Link
                href={`/details/${element.id}`}
                // ID={id}
                key={index}
                className="  group w-[457.5px] overflow-hidden rounded-lg lg:w-[230px]"
              >
                <img
                  className=" h-[300px] w-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
                />
                <div className="h-[90px] bg-gray-200 dark:bg-gray-900 p-2 text-extrabold">
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
      </div>
      <Footer />
    </div>
    </Suspense>
  );
}
