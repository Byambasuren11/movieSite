import Light from "@/components/Light";
import MovieLogo from "@/components/Movie-Logo";
import { Button } from "@/components/ui/button";
// import { SelectTrigger } from "@radix-ui/react-select";
import { Select, SelectTrigger } from "@/components/ui/select";

const Header=()=>{
    return(
        <>
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
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
              placeholder="Search..."
            />
          </div>
          <div>
            <Button className="bg-white border:solid border:1 hover:bg-gray-400"><Light/></Button>
          </div>
        </div>
        </>
    )
}
export default Header;