import { NavLink } from "react-router"
import { assets } from "../assets/assets"

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw]">
        <img src={assets.logo} className="mt-5 w-[max(10vw,100px)] hidden sm:block" alt="" />
        <img src={assets.logo_small} className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block" alt="" />

        <div className="flex flex-col gap-5 mt-10">
            <NavLink to="/add-song" className="btn-navbar">
                <img src={assets.add_song} className="w-5" alt="" />
                <p className="hidden sm:block">Add Song</p>
            </NavLink>
            <NavLink to="/list-song" className="btn-navbar">
                <img src={assets.song_icon} className="w-5" alt="" />
                <p className="hidden sm:block">List Song</p>
            </NavLink>
            <NavLink to="/add-album" className="btn-navbar">
                <img src={assets.add_album} className="w-5" alt="" />
                <p className="hidden sm:block">Add Album</p>
            </NavLink>
            <NavLink to="/list-album" className="btn-navbar">
                <img src={assets.album_icon} className="w-5" alt="" />
                <p className="hidden sm:block">List Album</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar