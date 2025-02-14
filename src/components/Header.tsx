
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
import { Sun, Moon} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Genre from "./Genre";
import Search1 from "./Search";

const Header = () => {
  const { setTheme, theme } = useTheme();

  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <>
      <div className="flex w-full h-[60px] justify-between items-center shrink-0 xl:w-2/3">
        <Link
          className="flex text-indigo-700 italic font-bold gap-2"
          href={"/"}
        >
          <MovieLogo />
          <p>Movie Z</p>
        </Link>
        <div className=" flex gap-3 w-2/3 justify-end md:justify-between">
          <div className="flex gap-4 ">
            <Genre />
            <Search1/>
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
      </div>
    </>
  );
};
export default Header;
