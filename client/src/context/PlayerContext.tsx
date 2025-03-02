/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, FC, useRef, useState, useEffect } from "react";
import axios from "axios";

export interface SongType {
    id : number
    name: string
    album: number
    file: string
    image: string
    desc: string
    duration: string
  }

export interface Album {
    id: number
    name: string
    image: string
    bgColor: string
    desc: string
}


export const PlayerContext = createContext<any>(null);
const url = "http://localhost:8080";

const PlayerContextProvider: FC<{children : ReactNode}> = ({children}) => {

    const audioRef = useRef<any>(null);
    const seekBg = useRef<any>(null);
    const seekBar = useRef<any>(null);

    
    
    const [songsData, setSongsData] = useState<SongType[]>([])
    const [albumsData, setAlbumsData] = useState<Album[]>([])
    const [track, setTrack] = useState<SongType>(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id: number) => {
        await songsData.map((item) => {
            if(id === item.id){
                setTrack(item)
            }
        })
        await audioRef.current.play();
        setPlayStatus(true)
    }

    const previous = async () => {
        songsData.map(async(item, index) => {
            if (index > 0 && item.id === track.id){
                await setTrack(songsData[index-1])
                await audioRef.current.play();
                await setPlayStatus(true)
            }
        });
    }

    const next = async () => {
        songsData.map(async(item, index) => {
           if(songsData.length > index && item.id === track.id) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                await setPlayStatus(true);
           }
        })
    }

    const seekSong = (e: React.MouseEvent<HTMLButtonElement>) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
    }

    const getSongsData = async() => {
        try {
            const response = await axios.get(`${url}/spotify/songs`);
            setSongsData(response.data.data)
            setTrack(response.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const getAlbums = async () => {
        try {
            const response = await axios.get(`${url}/spotify/albums`)
            setAlbumsData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    // perlu dipahami lagi
    useEffect(() => {
        setTimeout(() => {
                audioRef.current.ontimeupdate = () => {
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    })
                }
        },1000)
    },[audioRef])

    useEffect(() => {
        getAlbums()
        getSongsData()
    },[])

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;