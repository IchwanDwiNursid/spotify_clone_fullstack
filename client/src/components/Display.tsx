/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes, useLocation } from "react-router"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import { useContext, useEffect, useRef } from "react"
import { Album, PlayerContext } from "../context/PlayerContext"

const Display = () => {

    const {albumsData} = useContext(PlayerContext);


    const displayRef = useRef<any>(null);
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : ""
    const bgColor = isAlbum ? albumsData.find((x: Album) => x.id === Number(albumId)).bgColor : ""

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
        } else {
            displayRef.current.style.background = `#121212`;
        }
    })

  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <Routes>
            <Route path="/" element={<DisplayHome/>}/>
            <Route path="/album/:id" element={<DisplayAlbum album={albumsData.find((x: Album) => x.id === Number(albumId))}/>}/>
        </Routes>
    </div>
  )
}

export default Display