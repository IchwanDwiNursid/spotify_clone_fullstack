import { useState } from "react"
import { assets } from "../assets/assets"
import { toast } from "react-toastify"
import axios from "axios"
import { url } from "../App"

const AddAlbum = () => {
    const [image, setImage] = useState<File | null>(null)
    const [color, setColor] = useState("#121212")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [loading, setLoading] = useState(false)
    
    const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
          const formData = new FormData();
          formData.append('name', name)
          formData.append('desc', desc)
          formData.append('bgColor',color)
          if (image) {
            formData.append('image', image)
          }

          const response = await axios.post(`${url}/spotify/album`, formData)

          if (response.data) {
            toast.success('Album created succesfully')
            setImage(null)
            setColor("#121212")
            setName("")
            setDesc("")
            console.log(response.data.data)
          } else {
            toast.error('Shomething went wrong')
          }
        } catch (error) {
          toast.error((error as Error).message)
        }finally{
          setLoading(false)
        }
    }

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 place-self-center border-4 border-gray-300 border-t-green-800 border-l-green-800 rounded-full animate-spin"></div>
    </div>
    ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">

      <div className="flex flex-col gap-4 items-center">
        <p>Upload image</p>
        <input onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} type="file" id="image" accept="image/*" hidden/>
        <label htmlFor="image">
          <img className="w-24 cursor-pointer" src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type here" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"/>
      </div> 

      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" placeholder="Type here" className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"/>
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input onChange={(e) => setColor(e.target.value)} value={color} type="color" />
      </div>

      <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">ADD</button>
    </form>
  )
}

export default AddAlbum