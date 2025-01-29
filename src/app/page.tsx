"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowPlaying from "@/components/nowPlaying";
import Popular from "@/components/Popular";
import Top from "@/components/Top-Rated";
import Coming from "@/components/Up-Coming";


export default function Home() {

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <Header/>
        <NowPlaying/>
        <Coming/>
        <Popular/>
        <Top/>
        <Footer/>
      </div>
    </>
  );
}
