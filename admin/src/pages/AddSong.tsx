import React, { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { url } from "../App"
import { toast } from "react-toastify"
import { Album } from "./ListAlbum"

const AddSong = () => {
    const [image, setImage] = useState<File | null>(null)
    const [song, setSong] = useState<File | null>(null)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [album, setAlbum] = useState("none")
    const [loading, setLoading] = useState(false)
    const [albumData, setAlbumData] = useState<Album[]>([])

    const fetchDataAlbum = async () => {
        try {
            const response = await axios.get(`${url}/spotify/albums`)
            if (response.data) {
                setAlbumData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', name)
            if (song && image) {
                formData.append('file', song)
                formData.append('image', image)
            }
            formData.append('desc', desc)
            formData.append('album',album)

            const response = await axios.post(`${url}/spotify/song`, formData) 
            if(response.data) {
                toast.success("Song added")
                setName("")
                setDesc("")
                setImage(null)
                setSong(null)
                setAlbum("none")
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error((error as Error).message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataAlbum()
    },[])
  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 place-self-center border-4 border-gray-300 border-t-green-800 border-l-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
        {/* upload */}
        <div className="flex gap-8">
            <div className="flex flex-col gap-4">
                <p>Upload songs</p>
                <input onChange={(e) => setSong(e.target.files ? e.target.files[0] : null)} type="file" id="song" accept="audio/*" hidden/>
                <label htmlFor="song">
                    <img src={song !== null ? assets.upload_added : assets.upload_song} className="w-24 cursor-pointer" alt="" />
                </label>
            </div>
            <div className="flex flex-col gap-4">
                <p>Upload Image</p>
                <input onChange={(e)=> setImage(e.target.files ? e.target.files[0] : null)} type="file" id="image" accept="image/*" hidden/>
                <label htmlFor="image">
                    <img src={image !== null ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer" alt="" />
                </label>
            </div>
        </div>

        <div className="flex flex-col gap-2.5">
            <p>Song name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type here" type="text" />
        </div>
        <div className="flex flex-col gap-2.5">
            <p>Song description</p>
            <input onChange={(e) => setDesc(e.target.value)} value={desc} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]" placeholder="Type here" type="text" />
        </div>

        <div className="flex flex-col gap-2.5">
            <p>Album</p>
            <select onChange={(e) => setAlbum(e.target.value)} defaultValue={album} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]">
                {albumData && albumData.map(({name}) => (
                    <option value={name}>{name}</option>
                ))}
            </select>
        </div>

        <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">ADD</button>
    </form>
  )
}

export default AddSong