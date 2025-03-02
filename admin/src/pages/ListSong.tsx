import axios from "axios";
import {useEffect, useState} from "react"
import { url } from "../App";
import { toast } from "react-toastify";

export interface Song {
  id : number
  name: string
  album: number
  file: string
  image: string
  desc: string
  duration: string
}

const ListSong = () => {
    const [data, setData] = useState<Song[]>([]);

    const fetchSong = async() => {
        try {
            const response = await axios.get(`${url}/spotify/songs`);
            if (response.data) {
              setData(response.data.data)
            }
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    const removeSong = async (id: number, name : string) => {
      try {
        const response = await axios.delete(`${url}/spotify/song`,{data: {id : id}})
        if (response.data) {
          toast.success(`Song With Name ${name} has been deleted`)
          await fetchSong()
        } else {
          toast.error( `Song with Name ${name} not deleted`)
        }

      } catch (error) {
        toast.error((error as Error).message)
      }
    }

    useEffect(() => {
        fetchSong()
    },[])
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data && data.map(({id, name,album,image, duration}) => (
          <div key={id + 1} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
            <img className="w-12" src={`${url}/spotify/cdn/${image}`} alt="" />
            <p>{name}</p>
            <p>{album}</p>
            <p>{duration}</p>
            <p onClick={() => removeSong(id,name)} className="cursor-pointer font-semibold">X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSong