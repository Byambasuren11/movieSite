"use client";
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Star from "./Star";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Genre from "./Genre";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const [se, setSe] = useState(false);

  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const [searchResult, setSearchResult] = useState();
  const getClickedGenres = async () => {
    try {
      const search1 = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=1&api_key=59e727c8b34f9b1acd7cf78c59abfe03`
      );
      const resultSearch = await search1.json();
      setSearchResult(resultSearch.results);
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
  return (
    <>
    <div className="flex w-2/3 h-[60px] justify-between items-center shrink-0 sm:w-full">
        <Link
          className="flex text-indigo-700 italic font-bold gap-2"
          href={"/"}
        >
          <MovieLogo />
          <p>Movie Z</p>
        </Link>
        <div className="flex gap-4 ">
          <Genre />
          <div className=" w-2/3 ">
            <div className="absolute text-gray-500 top-4">
              <Search size={16} />
            </div>
            <input
              type="text"
              className="h-9 focus-visible:ring-0 border-0 outline-none rounded-none sm:block"
              placeholder="Search..."
              onChange={onChange}
            />
            <div className="absolute z-10  h-fit bg-white dark:bg-black border rounded-xl mt-4">
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
                        <span className="text-muted-foreground text-xs">
                          /10
                        </span>
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
              {se ? (
                <Link
                  className="px-4 py-2.5 text-sm font-medium text-foreground "
                  href="/search"
                >
                  See all results for "{search}"
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" onClick={onClick}>
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>

    </>
  );
};
export default Header;
