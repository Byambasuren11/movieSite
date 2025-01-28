import { useEffect } from "react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


type Movie = {
  name: string;
  imdb: number;
  descriftion: string;
  img:string
};

const NowPlaying = () => {
  // const [movies]
  const [movies, setMovies] = useState([]);
  const [hoho,setHoho]=useState([])

  const getPicture = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03"
      );
      const result = await response.json();
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
 console.log(movies);
  movies.map(()=>{

  })
  useEffect(() => {
    getPicture();
  }, []);
  return <>
  <Carousel>
          <CarouselContent className="w-full h-[400px]">
            <CarouselItem ><img src="movies[0].backdrop_bath"/></CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
  </>;
};
export default NowPlaying;
