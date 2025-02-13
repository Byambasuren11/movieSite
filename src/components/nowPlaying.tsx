import React, { ReactNode, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Star from "./Star";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from 'react-player/youtube'
import Autoplay from "embla-carousel-autoplay";

type Movie = {
  id: any;
  vote_average: number;
  overview: string;
  original_title: string;
  backdrop_path: string;
};
type Video={
  key:string;
}
const NowPlaying = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [video, setVideo]=useState<Video> ()

  const getPicture = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03"
      );
      const result = await response.json();
      // const video=await fetch(`https://api.themoviedb.org/3/movie/${result.results[0].id}/videos?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`)
      // const result1=await video.json();
      // setVideo(result1.results)
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getVideo = async (id:number) => {
    try {
        const video=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`)
        const result1=await video.json();
        setVideo(result1.results[0])
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPicture();
  }, []);
 

  return (
    <Carousel
    plugins={[Autoplay({ delay: 3000 })]}
    opts={{
      loop: true,
    }}>
      <CarouselContent className="w-full h-[600px] mt-5">
        {movies.slice(0, 10).map((element, index) => (
          <CarouselItem key={index} className="relative">
            <img
              className="h-1/2 w-full xl:h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${element.backdrop_path}`}
              alt={element.original_title}
            />
            <div className="w-[400px] h-[400px] absolute left-10 top-180 mt-10 flex flex-col xl:z-10 xl:top-40 xl:left-80 xl:p-5 xl:space-y-4 xl:p-0">
              <p className=" w-52 text-2xl font-semibold truncate text-white">
                {element.original_title}
              </p>
              <p className="flex text-foreground text-sm items-center gap-x-1 text-white ">
                <Star /> {element.vote_average.toFixed(1)}
                <span className="text-muted-foreground text-xs">/10</span>
              </p>
              <p className="text-white w-[302px] text-sm line-clamp-5">
                {element.overview}
              </p>
              <Dialog >
                <DialogTrigger >
              <Button onClick={()=>getVideo(element.id)}>watch Trailer</Button>
                </DialogTrigger>
                <DialogContent className="w-fit max-w-3xl">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${video?.key}` }/>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-40 left-10 xl:left-20 xl:top-80" />
      <CarouselNext className="absolute top-40 right-10 xl:right-20 xl:top-80" />
    </Carousel>
  );
};

export default NowPlaying;
