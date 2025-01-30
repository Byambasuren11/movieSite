const Movie = () => {
  return (
    <>
    <div className="w-[1080px] mt-20 flex flex-col gap-5">
      <div className="flex w-full justify-between">
        <div>
          <div className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
            Movie Name
          </div>
          <div>garah udur</div>
        </div>
        <div>rating</div>
      </div>
      <div className="flex justify-between ">
        <div className="w-[280px] h-[428px] bg-black">
            zurag
        </div>
        <div className="w-[760px] h-[428px] bg-black">
            video
        </div>
      </div>
      <div className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs">
        genre
      </div>
      <div className="text-base">tailbar</div>
      <div className="flex flex-col space-y-5 text-foreground mb-8">
        <div className=" font-bold w-16 mr-13">zohiolc</div>
        <div className=" font-bold w-16 mr-13">writers</div>
        <div className=" font-bold w-16 mr-13">Starts</div>
      </div>
      <div className="flex justify-between">
          <h3 className="text-foreground text-2xl font-semibold">More like this</h3>
          <h3 className="cursor-pointer">
            see more
          </h3>
        </div>
    </div>
    </>
  );
};
export default Movie;
