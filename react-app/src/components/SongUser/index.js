import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";
import SongDelete from "../SongDelete";
import SongEdit from "../SongEdit";
import OpenModalButton from "../OpenModalButton";
import './SongUser.css'

export default function SongUser() {
    const dispatch = useDispatch();

    const songsObj = useSelector(state => state.songs.allSongs);
    const user = useSelector(state => state.session.user)
    const songs = Object.values(songsObj).filter(song => song.user?.id === user.id)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    return (
        <>
            <div className=" index">
                <div className="all-user-songs">
                {songs.length > 0 && songs.map(song => (
                    <>
                        <div className="user-song-button-container">
                            <SongCard key={song.id} song={song} />
                            <div className="user-song-buttons">
                                {user && user.id === song.user.id && <OpenModalButton
                                    buttonClass='button-white'
                                    buttonText=<i className="fa-solid fa-trash fa-xs"></i>
                                    buttonText2='&nbsp;&nbsp;Delete'
                                    modalComponent={<SongDelete songId={song.id} />}
                                />}
                                {user && user.id === song.user.id && <OpenModalButton
                                    buttonClass='button-white'
                                    buttonText=<i className=" fa-solid fa-pen-nib fa-xs"></i>
                                    buttonText2='&nbsp;&nbsp;Edit'
                                    modalComponent={<SongEdit songId={song.id} />}
                                />}
                            </div>
                        </div>
                    </>
                ))}

                </div>
            </div>
        </>
    )
}
