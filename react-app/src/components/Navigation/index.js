import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SongSearchBar from "./SongSearchBar";
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
			<i class="fa-solid fa-cloud-bolt fa-2x"></i><NavLink id="logo" exact to="/">LoudCloud</NavLink>
			</li>
			<li className='searchbar-li'>
				<SongSearchBar id='searchbar' />
			</li>

			{sessionUser ? (
				<>
				{isLoaded && (
				<li className="profile-button">
					<ProfileButton user={sessionUser} />
				</li>
			)}
				</>

			) : (
				<>
					<li className="login-button">
					<OpenModalButton
						buttonText="Sign In"
						modalComponent={<LoginFormModal />}
					/>
					</li>
					<li className="signup-button">
					<OpenModalButton
						buttonText="Create Account"
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
