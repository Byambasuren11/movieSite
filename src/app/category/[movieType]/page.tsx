"use client";
import Header from "@/components/Header";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
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
  console.log(movie);
  useEffect(() => {
    getPopular();
  }, []);
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const onClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", (Number(page) + 1).toString());
    params.set("genres", 'dsa');

    router.push(`/?${params.toString()}`);
  };
  console.log(page);
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <Header />
          <div className="w-[1280px] text-foreground text-2xl font-semibold  mt-1 mb-4">{movieType}</div>
        <div className="flex gap-6 flex-wrap w-[1280px]">
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
          <Pagination className="w-full flex justify-end mb-20">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
