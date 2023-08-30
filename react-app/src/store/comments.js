const GET_COMMENTS = "comments/getComments";
const CREATE_COMMENT = "comments/createComment";
const DELETE_COMMENT = "comments/deleteComment";
const EDIT_COMMENT = "songs/editComment";


const getCommentsAction = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
};

const createCommentAction = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const deleteCommentAction = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const editCommentAction = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}


export const getCommentsThunk = (songId) => async dispatch => {
    const res = await fetch(`/api/comments/${songId}`)

    if (res.ok) {
        const comments = await res.json();
        dispatch(getCommentsAction(comments))
    }
};

export const createCommentThunk = ({ songId, payload }) => async dispatch => {
    const res = await fetch(`/api/comments/${songId}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const comment = await res.json();
        dispatch(createCommentAction(comment))
        return comment;
    }
    else {
        return res
    }
}

export const deleteCommentThunk = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        dispatch(deleteCommentAction(commentId))
    }
}

export const editCommentThunk = (payload) => async dispatch => {
    const newComment = payload;
    const res = await fetch(`/api/comments/edit/${newComment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
    })

    if (res.ok) {
        const comment = await res.json();
        dispatch(editCommentAction(comment))
        return comment;
    }
    else {
        return res
    }
}


const initialState = { song: {}, user: {} };

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS: {
            newState = { ...state, song: {}, user: {} }
            action.comments.forEach(comment => newState.song[comment.id] = comment)
            return newState
        }
        case CREATE_COMMENT: {
            newState = { ...state, song: { ...state.song }, user: {} }
            newState.song[action.comment.id] = action.comment;
            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state, song: { ...state.song }, user: {} }
            delete newState.song[action.commentId]
            return newState
        }
        case EDIT_COMMENT: {
            newState = { ...state, song: { ...state.song }, user: {} }
            newState.song[action.comment.id] = action.comment;
            return newState;
        }
        default:
            return state;
    }
};

export default commentReducer;