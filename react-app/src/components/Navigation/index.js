import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<li>
				<NavLink id="logo" exact to="/">LoudCloud</NavLink>
			</li>
			
			{sessionUser ? (
				<></>

			) : (
				<>
					<li className="login-button">
					<OpenModalButton
						buttonText="Sign In"
						modalComponent={<LoginFormModal />}
					/>
					</li>
					<li>
					<OpenModalButton
						buttonText="Create Account"
						modalComponent={<SignupFormModal />}
					/>
					</li>
				</>
				)
			}


			{isLoaded && (
				<li className="profile-button">
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;