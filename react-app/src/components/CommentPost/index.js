import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk } from "../../store/comments";
// import { useModal } from "../../context/Modal";
import { useState } from "react";
import "./CommentPost.css";
import { getSongThunk } from "../../store/songs";
import noProfileImg from '../../images/blue-profile.jpeg';


export default function CommentPost({ song }) {
    const dispatch = useDispatch();
    // const { closeModal } = useModal();
    const [input, setInput] = useState("");
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user);


    const songId = song.id;

    const handleSubmit = async (e) => {
        e.preventDefault()

        let validationErrors = {}

        if (!input) validationErrors.comment = 'Please provide a valid comment'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload = {
            comment: input
        }

        try {
            await dispatch(createCommentThunk({ songId, payload }))
            dispatch(getSongThunk(songId))
            setInput("")
            setErrors({})
        } catch (error) {
            console.error('Error creating comment:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form-box">
            {/* <i className="fa-solid fa-cloud-bolt fa-2x"></i> */}
            <img id='comment-image' src={user.image || noProfileImg} alt={user.username}></img>
            {Object.values(errors).length > 0 && <p className="errors">{errors.comment}</p>}
            <input
                type="text"
                placeholder="Write a comment"
                maxlength="1000"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}