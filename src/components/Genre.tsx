"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Genre = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "1";
  const ids = searchParams.get("genres")
  ? searchParams.get("genres")?.split(",")
  : [];

  type movie={
    vote_average: number;
    overview: string;
    title: string;
    release_date: string;
    backdrop_path: string;
    id: string;
    name:string;
    poster_path: string;
    genres: { name: string }[];
    cast:{ name: string }[];
    results:{id:string, poster_path:string, vote_average: number, title: string }[];
  }

  const [clickedGenre, setClickedGenre] = useState<movie[]>();
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
  useEffect(() => {
    getClickedGenres();
  }, []);

  const onClick1 = (id:string) => {
    const params = new URLSearchParams(searchParams.toString());
    ids?.push(id);
    if (ids){
      params.set("genres", ids.join(","));
    }
    // params.set("genres", ids.join(","));
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="border h-10 hidden md:flex">
              <p>genre</p>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <div className="border-b border-3 flex flex-col gap-3 p-3">
                <h3 className="text-foreground text-2xl font-semibold">
                  Genres
                </h3>
                <div className="text-extrabold">
                  See lists of movies by genre
                </div>
              </div>
              <div className="flex w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] flex-wrap cursor-pointer">
                {clickedGenre?.map((element, index) => (
                  <Link
                    className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs w-fit"
                    key={index}
                    onClick={() => onClick1(element.id)}
                    href={"/genres/id"}
                  >
                    {element.name}
                    <ChevronRight className="w-3" />
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
export default Genre;
