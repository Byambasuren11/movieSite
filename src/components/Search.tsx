import { useEffect, useState } from "react";
import Star from "./Star";
import Link from "next/link";
import {Search, ArrowRight } from "lucide-react";

const Search1=()=>{
    const [search, setSearch] = useState("");
    const [se, setSe] = useState(false);
    const [clickSearch, setClickSearch] = useState(false);
  
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
  
    const searchClick=()=>{
  setClickSearch(true)
    }
    return(
        <>
        <div className=" flex h-10 gap-[10px] items-center border px-3 rounded-md relative">
              <Search size={16} onClick={searchClick}/>
              <input
                type="text"
                className="h-9 focus-visible:ring-0 border-0 outline-none rounded-none hidden md:block"
                placeholder="Search..."
                onChange={onChange}
              />
              <div className="absolute z-10 h-fit bg-white dark:bg-black rounded-xl top-9 left-[-150px] w-[577px]">
                {searchResult?.slice(0, 5).map((element, index) => (
                  <div className="flex m-4 gap-4 border-b">
                    <img
                      className="w-[67px] h-[100px] rounded-sm"
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
        </>
    )
}
export default Search1;