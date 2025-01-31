
'use client'
import { useParams } from "next/navigation";

export default function Home () {
      const { movieType } = useParams();
      // console.log(id);
      
    
    return(<p>'[movieType]" shhuuuu {movieType as string}</p>)
}