import { BookmarkIcon, StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import placeholder from "../assets/placeholder.webp";
function Card(props) {
  return (
    <div className="w-full aspect-16/9 px-3 my-3 md:w-1/2 lg:w-1/4">
      <div className="h-full bg-cover bg-center bg-no-repeat rounded rounded-xl relative overflow-hidden" style={{ backgroundImage: `url(${placeholder})` }}>
        <img src={props.image} alt={props.title} className="h-full" style={{ opacity: 0, transition: "opacity 0.5s ease-in-out", transitionDelay: "0.5s" }} onLoad={(e) => (e.target.style.opacity = 1)} />
        <p className="w-full text-lg text-white font-semibold leading-none absolute bottom-0 px-3 py-2" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0) 100%)" }}>{props.title} <span className="text-sm text-[#CCCCCC] font-normal">{props.year}</span></p>
      </div>
    </div>
  );
};
export default Card;


{/* <div className="bg-[#1d1d1d] h-10 flex justify-between">

                            <div>
                                <button title="Add to Library" className="h-full transition duration-150 ease-in-out cursor-pointer w-10 p-2 text-[#16a085] hover:bg-[#16a085] hover:text-white">
                                    <BookmarkIcon />
                                </button>
                                <button className="h-full transition duration-150 ease-in-out cursor-pointer w-10 p-2 text-[#ff5f06] hover:bg-[#ff5f06] hover:text-white">
                                    <StarIcon />
                                </button>
                            </div>
                            <p className="w-1/2 gap-1 flex items-center justify-end p-2 text-[#9e2424]">
                                <span>
                                    <HeartIcon className="h-6" />
                                </span>
                                <span className="text-white font-bold">{Math.floor(trendingShows[0]?.show?.rating * 10)}%</span>
                            </p>

                        </div> */}