import { BookmarkIcon, StarIcon, HeartIcon } from "@heroicons/react/24/solid";
import placeholder from "../assets/placeholder.webp";
import justWatchLogo from "../assets/justWatchLogo.svg";
function Card(props) {
  return (
    <div className={`w-full aspect-16/9 ${props.category != "Home" && "border border-r-[#2D2D2D] border-b-[#2D2D2D]"} ${props.category == "Home" && "px-3 my-3"} md:w-1/2 ${props.category == "Home" ? "lg:w-1/4" : "lg:w-1/3"}`}>
      <a href={`/${props.type}/${props.slug}`}>
        <div className={`h-full bg-cover bg-center bg-no-repeat ${props.category == "Home" && "rounded rounded-xl"} relative overflow-hidden`} style={{ backgroundImage: `url(${placeholder})` }}>
          {props.image &&
            <img src={props.image} alt={props.title} className="h-full" style={{ opacity: 0, transition: "opacity 0.5s ease-in-out", transitionDelay: "0.5s" }} onLoad={(e) => (e.target.style.opacity = 1)} />}
          <div style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }} className="w-full px-3 py-2 absolute bottom-0">
            {props.category == "Trending" &&
              <span className="h-6 bg-[#9F42C6] px-2 py-1 text-white text-xs rounded font-semibold">{props.watchers} Watchers</span>
            }

            {props.category == "Anticipated" &&
              <span className="h-6 bg-[#0082CE] px-2 py-1 text-white text-xs rounded font-semibold">{props.waiting} Anticipated</span>
            }
            {props.category == "Streaming" &&
              <div className="flex gap-1">
                <img src={justWatchLogo} className="h-6" alt="" />
                <span className="h-6 bg-[#E1B702] px-2 py-1 text-xs rounded font-semibold">{props.rank}</span>
                <span className="h-6 bg-black border border-[#FF0000] border-[#47AD45] rounded-2xl text-[#FF0000] px-2 py-1 text-xs rounded font-semibold">{props.delta > 0 ? <><i class="fa-solid fa-caret-up"></i>+{props.delta}</> : <><i class="fa-solid fa-caret-down"></i>{props.delta}</>}</span>
              </div>
            }

            <p className="w-full text-lg text-white font-semibold leading-none pt-2">{props.title} <span className="text-sm text-[#CCCCCC] font-normal">{props.year}</span></p>

          </div>
        </div>
      </a>
      {props.category != "Home" && <div className="h-10 flex justify-between bg-[#1D1D1D]">
        <div>
          <button title="Add to Library" className="h-full w-10 text-[#16A085] transition duration-200 ease-in-out cursor-pointer p-2 hover:text-white hover:bg-[#16A085] focus:text-white focus:bg-[#16A085]">
            <BookmarkIcon />
          </button>
          <button title="Add to Favorite" className="h-full w-10 text-[#FF5F06] transition duration-200 ease-in-out cursor-pointer p-2 hover:text-white hover:bg-[#FF5F06] focus:text-white focus:bg-[#FF5F06]">
            <StarIcon />
          </button>
        </div>
        <p className="w-1/2 flex items-center justify-end gap-1 text-[#9E2424] p-2">
          <HeartIcon className="h-6" />
          <span className="text-white font-bold">{Math.floor(props.rating * 10)}%</span>
        </p>
      </div>}
    </div>
  );
}
export default Card;