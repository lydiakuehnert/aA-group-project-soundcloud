const GET_SONGS = "songs/getSongs";
const GET_SONG = "songs/getSong";
const CREATE_SONG = "songs/createSong";
const GET_USER_SONGS = "songs/getUserSongs";
const DELETE_SONG = "songs/deleteSong";
const EDIT_SONG = "songs/editSong";
const PLAYER_SONG = "songs/playerSong"
const CREATE_LIKE = "songs/likeSong"
const DELETE_LIKE = "songs/likeDelete"


const getUserSongsAction = (songs) => {
    return {
        type: GET_USER_SONGS,
        songs
    }
}

const getSongAction = (song) => {
    return {
        type: GET_SONG,
        song
    }
}

const getSongsAction = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
};

const createSongAction = (song) => {
    return {
        type: CREATE_SONG,
        song
    }
}

const createLikeAction = (songId) => {
    return {
        type: CREATE_LIKE,
        songId
    }
}

const deleteLikeAction = (songId) => {
    return {
        type: DELETE_LIKE,
        songId
    }
}

const deleteSongAction = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}

const editSongAction = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
}

const playerSongAction = (song) => {
    return {
        type: PLAYER_SONG,
        song
    }
}

export const playerSongThunk = (song) => async dispatch => {
    dispatch(playerSongAction(song))
}

export const getSearchedSongsThunk = (query) => async dispatch => {
    const res = await fetch(`/api/songs/search?=${query}`)

    if (res.ok) {
        console.log(res)
        const songs = await res.json();
        console.log(songs)
        dispatch(getSongsAction(songs))
    }
}

export const getSongThunk = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`);

    if (res.ok) {
        const song = await res.json()
        dispatch(getSongAction(song))
    }
}

export const getSongsThunk = () => async dispatch => {
    const res = await fetch('/api/songs')

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs))
    }
};

export const getLikedSongsThunk = () => async dispatch => {
    try {
        const res = await fetch('/api/likes')

        if (res.ok) {
            const songs = await res.json();
            dispatch(getSongsAction(songs))
            console.log(songs)
        }
    }
    catch (e) {
        const data = await e.json()
        return data;
    }
};

export const createLikeThunk = (songId) => async dispatch => {
    try {
        const res = await fetch(`/api/likes/${songId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        if (res.ok) {
            const postLike = await res.json()
            dispatch(createLikeAction(songId))
            return postLike
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
            const deleteLike = await res.json()
            dispatch(deleteLikeAction())
            return deleteLike
        }
    } catch (e) {
        const data = await e.json()
        return data
    }
}

export const createSongThunk = (song, user) => async dispatch => {
    try {
        const res = await fetch('/api/songs/upload', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(song)
            body: song
        })

        if (res.ok) {
            if (!user) throw new Error('Please log in to create a song')
            const newSong = await res.json();
            dispatch(createSongAction(newSong))
            console.log(newSong)
            return newSong;
        }
    } catch (e) {
        const data = await e.json()
        return data;
    }
}

export const deleteSongThunk = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        dispatch(deleteSongAction(songId))
    }
}

export const editSongThunk = (song, songId) => async dispatch => {
    try {
        const res = await fetch(`/api/songs/${songId}`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(song)
            body: song
        })

        if (res.ok) {
            const song = await res.json();
            console.log("NEW SONG FROM THUNKY", song)
            dispatch(editSongAction(song))
            return song;
        }
    } catch (e) {
        const error = await e.json()
        return error;
    }
}


const initialState = { allSongs: {}, singleSong: {}, playerSong: {}};

const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SONGS: {
            newState = { ...state, allSongs: {}, singleSong: {} }
            action.songs.forEach(song => newState.allSongs[song.id] = song)
            return newState
        }
        case GET_SONG: {
            newState = { ...state, allSongs: { ...state.allSongs }, singleSong: {} }
            newState.singleSong = action.song;
            return newState;
        }
        case CREATE_SONG: {
            newState = { ...state, allSongs: { ...state.allSongs }, singleSong: {} }
            newState.allSongs[action.song.id] = action.song;
            newState.singleSong = action.song;
            return newState
        }
        case CREATE_LIKE: {
            newState = { ...state, allSongs: { ...state.allSongs } }
            // newState.allSongs[action.songId] = action.song
            // newState.singleSong = action.song
            return newState
        }
        case DELETE_LIKE: {
            newState = { ...state, allSongs: { ...state.allSongs } }
            return newState
        }
        case GET_USER_SONGS: {
            newState = { ...state, allSongs: {}, singleSong: {} }
            action.songs.forEach(song => newState.allSongs[song.id] = song)
            return newState
        }
        case DELETE_SONG: {
            newState = { ...state, allSongs: { ...state.allSongs }, singleSong: {} }
            delete newState.allSongs[action.songId]
            return newState
        }
        case EDIT_SONG: {
            newState = { ...state, allSongs: { ...state.allSongs }, singleSong: {} }
            newState.allSongs[action.song.id] = action.song;
            return newState;
        }
        case PLAYER_SONG: {
            newState = { ...state, allSongs: { ...state.allSongs }, singleSong: {}, playerSong: {} }
            newState.playerSong = action.song
            return newState
        }
        default:
            return state;
    }
};

export default songReducer;
