// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const POST_USER_IMAGE = "session/POST_USER_IMAGE"
const CREATE_LIKE = "songs/likeSong"
const DELETE_LIKE = "songs/likeDelete"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const postUserImage = (image) => ({
	type: POST_USER_IMAGE,
	image
})

const createLikeAction = (user) => {
	return {
		type: CREATE_LIKE,
		user
	}
}

const deleteLikeAction = (user) => {
	return {
		type: DELETE_LIKE,
		user
	}
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, firstname, lastname, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			firstname,
			lastname,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const postImage = (image) => async (dispatch) => {
	const res = await fetch('/api/users/image', {
		method: 'PUT',
		headers: { "Content-Type": "application/json", },
		body: JSON.stringify(image)
	})
	const updated_image = await res.json();
	console.log(updated_image);
	dispatch(postUserImage(updated_image))
	return image
}

export const createLikeThunk = (songId) => async dispatch => {
	try {
		const res = await fetch(`/api/likes/${songId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
		if (res.ok) {
			const user = await res.json()
			dispatch(createLikeAction(user))
			return user
		} else {
			const data = await res.json()
			return data
		}
	} catch (e) {
		console.error("an error has occured:", e)
		return null
	}
}

export const deleteLikeThunk = (songId) => async dispatch => {
	try {
		const res = await fetch(`/api/likes/${songId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		})

		if (res.ok) {
			const user = await res.json()
			dispatch(deleteLikeAction(user))
			return user
		}
	} catch (e) {
		const data = await e.json()
		return data
	}
}



export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case POST_USER_IMAGE:
			newState = {...state }
			let new_user = {...newState.user}
			new_user.image = action.image.image
			return {...newState, user: {...new_user}}
		case CREATE_LIKE: 
			newState = {...state, user: {}}
			newState.user = action.user
			return newState;
		case DELETE_LIKE:
			newState = { ...state, user: {} }
			newState.user = action.user
			return newState;
		default:
			return state;
	}
}
