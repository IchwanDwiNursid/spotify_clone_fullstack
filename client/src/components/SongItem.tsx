import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

export interface Song {
    name: string
    image: string
    desc: string
    id: number
}

const SongItem = ({name, image, desc, id}: Song) => {
  const {playWithId} = useContext(PlayerContext);
  return (
    <div onClick={() => playWithId(id)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className='rounded min-w-0.5 min-h-0.5'  src={`http://localhost:8080/spotify/cdn/${image}`} alt=""/>
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200">{desc}</p>
    </div>
  )
}

export default SongItem