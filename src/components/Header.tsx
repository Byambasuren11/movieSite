import Light from "@/components/Light";
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
// import { SelectTrigger } from "@radix-ui/react-select";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";


const Header = () => {
  const { setTheme, theme } = useTheme()
  const onClick=()=>{
 if(theme==="dark"){
  setTheme("light")}
else{
  setTheme("dark")
}
}
  return (
      <div className="flex w-[1280px] h-[60px] justify-between items-center shrink-0">
        <div className="flex text-indigo-700 italic font-bold gap-2">
          <MovieLogo />
          <p>Movie Z</p>
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger>genra</SelectTrigger>
          </Select>
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
          <span className="sr-only">Toggle theme</span>
        </Button>
        </div>
      </div>
  );
};
export default Header;
