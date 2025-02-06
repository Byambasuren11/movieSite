"use client"
import Light from "@/components/Light";
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
// import { SelectTrigger } from "@radix-ui/react-select";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Sun, Moon, Navigation, ChevronRight } from "lucide-react";
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

const Header = () => {
  const { setTheme, theme } = useTheme();
   const router = useRouter();
    const searchParams = useSearchParams();
    const genre = searchParams.get("genre") || "1";

  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const [clickedGenre, setClickedGenre]=useState()
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
  useEffect(()=>{
    getClickedGenres();
},[])
console.log(clickedGenre)
const onClick1 = (id) => {
  const params = new URLSearchParams(searchParams.toString());
 id.push(id);
  params.set("genre",id.join(","));
  console.log(params.toString());
  router.push(`/genres?${params.toString()}`);
};
  return (
    <div className="flex w-[1280px] h-[60px] justify-between items-center shrink-0">
      <Link className="flex text-indigo-700 italic font-bold gap-2" href={"/"}>
        <MovieLogo />
        <p>Movie Z</p>
      </Link>
      <div className="flex gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="border-2">genre</NavigationMenuTrigger>
              <NavigationMenuContent>
                  <div className="border-b border-3 flex flex-col gap-3 p-3">
                <h3 className="text-foreground text-2xl font-semibold">Genres</h3>
                <div className="text-extrabold">See lists of movies by genre</div>
                  </div>
                <div className="flex w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] flex-wrap cursor-pointer">
                  {clickedGenre?.map((element, index) => (
                    <Link
                      className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs w-fit"
                      key={index}
                      onClick={() => onClick1(element.id)} href={"/genres"}                    >
                      {element.name}
                      <ChevronRight className="w-3" />
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <input
          type="text"
          className="flex h-9 w-[200px] rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
          placeholder="Search..."
        />
      </div>
      <div>
        <Button variant="outline" size="icon" onClick={onClick}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </div>
  );
};
export default Header;
