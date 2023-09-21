import React from "react";
import { NavLink } from 'react-router-dom';
import SongSearch from "./components/SongSearch";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from 'react-redux';
import './SplashPage.css'


//at '/' only when signed out, trying to go there otherwise redirects to homepage
//no nav bar, but logo, sign in, create account at top on top of splash image
//search bar is below splash image
//a 'what's trending' with a small selection of songs

export default function SplashPage() {
	const sessionUser = useSelector(state => state.session.user);



    return (
        <div>
            <div>
            <ul className='nav-bar'>
			<li className="logo-li">
				<NavLink exact to="/" id='noDeco'><i className="fa-solid fa-cloud-bolt fa-2x"></i><span id="logo">LoudCloud</span></NavLink>
			</li>


					<li className="login-button">
					<OpenModalButton
						buttonText="Sign In"
						buttonClass='button-black'
						modalComponent={<LoginFormModal />}
					/>
					</li>
					<li className="signup-button">
					<OpenModalButton
						buttonText="Create Account"
						buttonClass='button-orange'
						modalComponent={<SignupFormModal />}
					/>
					</li>
		</ul>
            </div>

            <div>
                <SongSearch />
            </div>
        </div>
    )
}