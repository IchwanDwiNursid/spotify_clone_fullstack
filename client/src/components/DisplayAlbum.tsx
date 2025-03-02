/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router"
import Navbar from "./Navbar";
import { assets } from "../assets/frontend-assets/assets";
import { useContext, useEffect, useState } from "react";
import { Album, PlayerContext, SongType } from "../context/PlayerContext";

const DisplayAlbum = ({album} : any) => {
    const {id} = useParams(); 
    const [albumData,setAlbumData] = useState<Album | null>(null);
    const {playWithId, albumsData, songsData} = useContext(PlayerContext);

    useEffect(() => {
        albumsData.map((item: Album) => {
            if (item.id === Number(id)) {
                setAlbumData(item)
            }
        })
    },[])
  return albumData ? (
    <>
        <Navbar/>
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
            <img className="w-48 rounded" src={`http://localhost:8080/spotify/cdn/${albumData.image}`} alt="" />
            <div className="flex flex-col">
                <p>Playlist</p>
                <h2 className="text=5px font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                <h4>{albumData.desc}</h4>
                <p className="mt-1">
                    <img className="inline-block w-7 h-7" src={assets.spotify_logo} alt="" /> 
                    <b> Spotify</b> &bull; 1,321,124 Likes &bull; <b> 50 songs,</b>  about 2 hr 30 min
                </p>
            </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p><b className="mr-4">#</b>Title</p>
            <p>Album</p>
            <p className="hidden sm:block">Date Added</p>
            <img src={assets.clock_icon} className="m-auto w-4" alt="" />
        </div>
        <hr />
        {
            songsData.filter((item: SongType) => item.album === album.name).map(({duration,image,name,id}: {duration: string, image:string, name: string, id: number}, index: number) => (
                <div onClick={() => playWithId(id)} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b]">
                    <p className="text-white">
                        <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                        <img src={`http://localhost:8080/spotify/cdn/${image}`} className="inline w-10 mr-5" alt=""/>
                        {name}
                    </p>
                    <p className="text-[15px]">{albumData.name}</p>
                    <p className="text-[15px] hidden sm:block">5 days ago</p>
                    <p className="text-[15px] text-center">{duration}</p>
                </div>
            ))}
    </>
  ) : null
}

export default DisplayAlbum