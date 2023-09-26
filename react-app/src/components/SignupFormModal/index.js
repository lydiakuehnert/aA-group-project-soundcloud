import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setfirstname] = useState("");
	const [lastname, setlastname] = useState("");
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
		if (firstname.length >= 100) errorObj['firstname'] = "First name must be must be 100 characters or less";
		if (lastname.length >= 100) errorObj['lastname'] = "Last name must be must be 100 characters or less";
		if (password !== confirmPassword) errorObj['password'] = 'Passwords must match';
		if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";
	
		if (submitted) {
			setErrorObject(errorObj) 
		}
		}, [username, email, password, confirmPassword, submitted, firstname, lastname])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setErrorObject({})

		if(!Object.values(errorObject).length){
			if (password === confirmPassword) {
			const data = await dispatch(signUp(username, firstname, lastname, email, password));
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
		}

		
	};

	return (
		<div className="signup-outer-box">
		<div className="signup-box">
			<h1>Create your LoudCloud account</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className='errors' key={idx}>{error.split(':')[1]}</li>
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
				{errorObject.email && <p className='errors'>{errorObject.email}</p>}

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
				{errorObject.username && <p className='errors'>{errorObject.username}</p>}

				<label>
				<input className='signup-input'
					placeholder="First Name (optional)"
					type="text"
					value={firstname}
					onChange={(e) => setfirstname(e.target.value)}
				/>
				</label>
				{errorObject.firstname && <p className='errors'>{errorObject.firstname}</p>}
				<label>
				<input className='signup-input'
					placeholder="Last Name (optional)"
					type="text"
					value={lastname}
					onChange={(e) => setlastname(e.target.value)}
				/>
				</label>
				{errorObject.lastname && <p className='errors'>{errorObject.lastname}</p>}
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
				{errorObject.password && <p className='errors'>{errorObject.password}</p>}

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