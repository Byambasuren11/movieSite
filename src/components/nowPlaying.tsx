import { ReactNode, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Movie = {
  vote_avarage: number;
  overview: string;
  original_title: string;
  backdrop_path: string;
};

const NowPlaying = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getPicture = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03"
      );
      const result = await response.json();
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movies);
  useEffect(() => {
    getPicture();
  }, []);

  return (
    <Carousel>
      <CarouselContent className="w-full h-[550px]">
        {movies.slice(0, 10).map((element, index) => (
          <CarouselItem key={index} className="relative">
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${element.backdrop_path}`}
              alt={element.original_title}
            />
            <div className="flex flex-col w-[400px] h-[400px] absolute z-10 t-0">
              <p className=" text-[20px] text-white">
                {element.original_title}
              </p>
              <p className=" text-[20px] text-white">
                {element.overview}
              </p>
              <p className=" text-[20px] text-white">
                {element.vote_avarage}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-10" />
      <CarouselNext className="absolute right-10" />
    </Carousel>
  );
};

export default NowPlaying;
