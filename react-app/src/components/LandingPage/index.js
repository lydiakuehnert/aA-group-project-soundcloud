import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import SongSearch from "../SongSearch";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './LandingPage.css'
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getSongsThunk } from "../../store/songs";
import SongCard from "../SongCard";



//at '/' only when signed out, trying to go there otherwise redirects to homepage
//no nav bar, but logo, sign in, create account at top on top of splash image
//search bar is below splash image
//a 'what's trending' with a small selection of songs

export default function LandingPage() {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	const dispatch = useDispatch();

    const songsObj = useSelector(state => state.songs.allSongs);
    const songs = Object.values(songsObj)

	const songArr = []

    useEffect(() => {
		dispatch(getSongsThunk())
    }, [dispatch])

	if (sessionUser) history.push('/home')
	if (!songs.length) return null
	for (let i = 0; i < 12; i++) {
		songArr.push(songs[i])
	}

    return (
        <div className="index-landing">
            <div className="splash-image">

			<div className="splash-text">
					What's next in music is first on LoudCloud
			</div>

					<p className="splash-p">Upload your first track and begin your journey.</p>

					<p className="splash-p">LoudCloud gives you space to create, find your fans, and connect with other artists.</p>

			</div>

			<div>

				<div className="hear-div">
					<p className="hear">Hear what's trending for free in the LoudCloud community</p>

				</div>
				<div className="all-songs">
                {songArr.length && songArr.map(song => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
			</div>

        </div>
    )
}
