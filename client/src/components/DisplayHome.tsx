import Navbar from './Navbar'
import AlbumItem, {AlbumProps } from './AlbumItem'
import SongItem from './SongItem'
import { useContext } from 'react'
import { PlayerContext, SongType} from '../context/PlayerContext'

const DisplayHome = () => {
    const {songsData, albumsData} = useContext(PlayerContext)
  return (
    <>
        <Navbar/>
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Feature Charts</h1>
            <div className='flex overflow-y-scroll'>
                {albumsData.map(({image, desc, name,id}: AlbumProps, index: number) => (
                    <AlbumItem id={id} name={name} image={image} desc={desc} key={index}/>
                ))}        
            </div>
        </div>
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
            <div className='flex overflow-auto'>
                {songsData.map(({id, name, image, desc}: SongType, index: number) => (
                    <SongItem  id={id} name={name} image={image} desc={desc} key={index}/>
                ))}        
            </div>
        </div>
    </>
  )
}

export default DisplayHome