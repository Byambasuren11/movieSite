import Light from "@/components/Light";
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
// import { SelectTrigger } from "@radix-ui/react-select";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Sun, Moon, Navigation } from "lucide-react";
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
} from "@/components/ui/navigation-menu"

const Header = () => {
  const { setTheme, theme } = useTheme();
  console.log("theme", theme);
  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className="flex w-[1280px] h-[60px] justify-between items-center shrink-0">
      <div className="flex text-indigo-700 italic font-bold gap-2">
        <MovieLogo />
        <p>Movie Z</p>
      </div>
      <div className="flex gap-4">
        <NavigationMenu>
      <NavigationMenuItem>
          <NavigationMenuTrigger>genre</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <div>Action</div>
              <div>Adventure</div>
              <div>Animation</div>
              <div>Comedy</div>
              <div>Crime</div>
              <div>Documentary</div>
              <div>Drama</div>
              <div>Family</div>
              <div>Fantasy</div>
              <div>History</div>
              <div>Horror</div>
              <div>Music</div>
              <div>Mystery</div>
              <div>Romance</div>
              <div>Science Fiction</div>
              <div>TV Movie</div>
              <div>Thriller</div>
              <div>War</div>
              <div>Western</div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
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
