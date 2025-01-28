"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowPlaying from "@/components/nowPlaying";


export default function Home() {

  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <Header/>
        <div>
        <NowPlaying/>
      </div>
        <Footer/>
      </div>
    </>
  );
}
