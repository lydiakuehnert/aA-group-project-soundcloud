import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [errorObject, setErrorObject] = useState({})
	const { closeModal } = useModal();
	const [submitted, setSubmitted] = useState(false);

	useEffect(()=> {
		const errorObj = {};
		if (username.length >= 40) errorObj["username"] = "Username must be 40 characters or less";
		if (!username.length) errorObj["username"] = "Username cannot be blank";
		if (username.includes('@')) errorObj["username"] = "Username cannot be an email";
		if (email >= 255) errorObj["email"] = "Email must be must be 255 characters or less";
		if (!email.includes('@') || !email.includes('.')) errorObj["email"] = "Invalid email";
		if (!email.length) errorObj["email"] = "Email cannot be blank";
		// if (firstName.length < 1) errorObj['firstName'] = "All fields must be filled out";
		// if (lastName.length < 1) errorObj['lastName'] = "All fields must be filled out";
		if (password !== confirmPassword) errorObj['password'] = 'Passwords must match';
		if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";
	
		if (submitted) {
			setErrorObject(errorObj) 
		}
		}, [username, email, password, confirmPassword, submitted])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-outer-box">
		<div className="signup-box">
			<h1>Create your LoudCloud account</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className='errors' key={idx}>{error}</li>
					))}
				</ul>
				<label>
					<input
          				className='signup-input'
						placeholder="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p className='errors'>{errors.email}</p>}

				<label>
					<input
						className='signup-input'
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
				<input className='signup-input'
					placeholder="First Name"
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				</label>
				<label>
				<input className='signup-input'
					placeholder="Last Name"
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				</label>
				<label>
					<input
						className='signup-input'
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						className='signup-input'
						placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button id='signup-button' className='button-orange' type="submit">Sign Up</button>
			</form>
		</div>
		</div>
	);
}

export default SignupFormModal;