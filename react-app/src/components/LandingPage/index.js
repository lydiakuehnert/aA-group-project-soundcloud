import React from "react";
import { NavLink } from 'react-router-dom';
import SongSearch from "../SongSearch";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from 'react-redux';
import './LandingPage.css'
import { useHistory } from 'react-router-dom';



//at '/' only when signed out, trying to go there otherwise redirects to homepage
//no nav bar, but logo, sign in, create account at top on top of splash image
//search bar is below splash image
//a 'what's trending' with a small selection of songs

export default function LandingPage() {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	if (sessionUser) history.push('/home')


    return (
        <div className="index-landing">
            <div className="splash-image">
            </div>

			<div>
				<p>What's trending on LoudCloud</p>
			</div>
        
        </div>
    )
}