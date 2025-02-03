"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowPlaying from "@/components/nowPlaying";
import Popular from "@/components/Popular";
import Top from "@/components/Top-Rated";
import { Coming } from "@/components/Up-Coming";
import { useState } from "react";

export default function Home() {
  const [click, setClick] = useState(false);
  console.log("hoho", click);
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <Header />
        <NowPlaying />
        <Coming />
        <Popular/>
        <Top/>
        <Footer />
      </div>
    </>
  );
}
