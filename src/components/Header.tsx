"use client";
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, ArrowRight, MoveRight, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Star from "./Star";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "1";
  const [se, setSe]=useState(false)

  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const [clickedGenre, setClickedGenre] = useState();
  const [searchResult, setSearchResult] = useState();
  const getClickedGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const search1 = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const resultSearch = await search1.json();
      const result = await response.json();
      setSearchResult(resultSearch.results);
      setClickedGenre(result.genres);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClickedGenres();
  }, [search]);
  const onChange = (e) => {
    setSearch(e.target.value);
    setSe(true);
  };
  // setSe(false);
  const onClick1 = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    id.push(id);
    params.set("genre", id.join(","));
    router.push(`/genres?${params.toString()}`);
  };
  return (
    <div className="flex w-2/3 h-[60px] justify-between items-center shrink-0">
      <Link className="flex text-indigo-700 italic font-bold gap-2" href={"/"}>
        <MovieLogo />
        <p>Movie Z</p>
      </Link>
      <div className="flex gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="border-2">
                genre
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
        <div className="">
          <div className="absolute text-gray-500 top-4">
            <Search size={16}/>
          </div>
          <input
            type="text"
            className="flex h-9 w-[500px] rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px] relative"
            placeholder="Search..."
            onChange={onChange}
          />
          <div className="absolute z-10 w-[500px] h-fit bg-white dark:bg-black border rounded-xl mt-4">
            {searchResult?.slice(0, 5).map((element, index) => (
              <div className="flex m-4 gap-4 border-b">
                <img
                  className="w-1/6 h-1/6 rounded-sm"
                  src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
                />
                <div className="w-full  flex flex-col gap-4">
                  <div>
                    <p className="overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                      {element.title}
                    </p>
                    <p className="flex text-foreground text-sm items-center gap-x-1">
                      <Star /> {element.vote_average.toFixed(1)}
                      <span className="text-muted-foreground text-xs">/10</span>
                    </p>
                  </div>
                  <Link href={`/details/${element.id}`}>
                    <h3 className="cursor-pointer flex justify-end mr-8">
                      see more
                      <ArrowRight className="w-4" />
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
            {
              se?(<Link
                className="px-4 py-2.5 text-sm font-medium text-foreground "
                href="/search"
              >
                See all results for "{search}"
              </Link>):(<></>)
            }
            
          </div>
        </div>
      </div>
      <div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={onClick}>
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
      </div>
    </div>
  );
};
export default Header;
