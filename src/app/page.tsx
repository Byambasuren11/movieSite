"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowPlaying from "@/components/nowPlaying";
import Popular from "@/components/Popular";
import Top from "@/components/Top-Rated";
import { Coming } from "@/components/Up-Coming";
import { useState } from "react";

export default function Home() {
  const category=[{name:"upcoming" ,label:"Upcoming"},{name:"popular" ,label:"Popular"},{name:"top_rated" ,label:"Top Rated"}]
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center bg-white dark:bg-black">
        <Header />
        <NowPlaying />
        <Coming />
        <Popular />
        <Top />
        <Footer />
      </div>
    </>
  );
}
