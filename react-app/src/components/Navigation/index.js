import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SongSearchBar from "./SongSearchBar";
import SongUpload from "../SongUpload";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="nav-background">
		<ul className='nav-bar'>
			<li className="logo-li">
				<NavLink  exact to="/" id='noDeco'><i className="fa-solid fa-cloud-bolt fa-2x"></i><span id="logo">LoudCloud</span></NavLink>
			</li>
			<li className='searchbar-li'>
				<SongSearchBar id='searchbar' />
			</li>
			{/* {sessionUser ? ( */}


			{sessionUser ? (
				<>
				{isLoaded && (
				<>
				<li className="upload-button">
				<NavLink className='navlink-link' exact to={`/upload`}>Upload</NavLink>
			</li>
			<li className="user-songs-button">
				<NavLink className='navlink-link' exact to={`/uploads`}>Your Songs</NavLink>
			</li>
				<li className="profile-button">
					<ProfileButton user={sessionUser} />
				</li>

			</>
			)}
				</>

			) : (
				<>
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
				</>
				)
			}



		</ul>
		</div>
	);
}

export default Navigation;
