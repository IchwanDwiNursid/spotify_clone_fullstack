import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../App"
import { toast } from "react-toastify"


export interface Album {
  id : number,
  name: string
  image: string
  bgColor: string
  desc: string
}
const ListAlbum = () => {
  const [data, setData] = useState<Album[]>([])

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/spotify/albums`)

      if (response.data) {
        setData(response.data.data)
      } else {
        toast.error("Shomething went wrong")
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const deleteAlbum = async (id: number) => {
    try {
      const response = await axios.delete(`${url}/spotify/album`,{data: {id}})
      if (response.data) {
        toast.success(`Album with name ${name} has been deleted`)
        fetchAlbums();
      } else {
        toast.error('Shometing went wrong')
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    fetchAlbums()
  },[])

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>

          <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Album Color</b>
            <b>Action</b>
          </div>
          {data && data.map(({id,name,bgColor,desc,image}, index) => (
            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5" key={index}>
              <img className="w-12" src={`${url}/spotify/cdn/${image}`} alt="" />
              <p>{name}</p>
              <p>{desc}</p>
              <input type="color" value={bgColor} />
              <p onClick={() => deleteAlbum(id)} className="font-bold cursor-pointer">X</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ListAlbum