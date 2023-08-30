import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongThunk } from "../../store/songs";
import SongComments from "../SongComments";
import LikeSong from "../LikeSong";
import LikeDelete from "../LikeDelete";
import "./OneSong.css"
import { playerSongThunk } from "../../store/songs";

export default function OneSong() {
    const { songId } = useParams();
    
    const dispatch = useDispatch();
    
    const song = useSelector(state => state.songs.singleSong);
    const [songAudio, setSongAudio] = useState(song.audio)
    const [songClass, setSongClass] = useState('song-play-button hidden');

    useEffect(() => {
        dispatch(getSongThunk(songId))
    }, [dispatch])

    const hoverPlay = () => {
        setSongClass("song-play-button")
    }

    const sendAudio = () => {
        setSongAudio(song.audio)
        console.log("SONGAUDIO", songAudio)
        dispatch(playerSongThunk(songAudio))
    }

    const mouseLeave = () => setSongClass('song-play-button hidden')

    if (!song) return null;
    if (!song.id) return null;

    return (
        <div className="song-detail-page index">
            <div className="song-detail-box">
                <h1>{song.name}</h1>
                <div className="song-img-box" onMouseEnter={hoverPlay} onMouseLeave={mouseLeave}>
                    <img src={song.image}></img>
                    <div className={songClass} onClick={sendAudio}><i class="fa-regular fa-circle-play fa-4x"></i></div>
                </div>
                <div className="under-pics">
                    <div>
                        <h1>Artist: {song.user.username}</h1>
                        <LikeSong />
                        <LikeDelete />
                    </div>
                    {/* <div className="callout-info-box">
                        <div className="callout-info">
                            <div className="callout-price">
                                <h2>${song.price}</h2> <h3>night</h3>
                            </div>
                            <h3>
                                <i className="fa-solid fa-star"></i>
                                {song.avgStarRating ? `${song.avgStarRating.toFixed(1)} · ${song.numReviews} ` : "New"}
                                {song.numReviews === 1 ? "review" : ""}
                                {song.numReviews > 1 ? "reviews" : ""}
                            </h3>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="comment-detail-box">
                <SongComments song={song} />
            </div>
        </div>
    )
}
