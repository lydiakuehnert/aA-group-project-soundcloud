import { useDispatch } from "react-redux";
import { createCommentThunk } from "../../store/comments";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import "./CommentPost.css";
import { getSongThunk } from "../../store/songs";

export default function CommentPost({ song }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [input, setInput] = useState("");
    const [errors, setErrors] = useState({})

    const songId = song.id;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            comment: input
        }

        const result = await dispatch(createCommentThunk({ songId, payload }))
        
        if (result.errors) {
            setErrors(result)
        } else {
            dispatch(getSongThunk(songId))
            setInput("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form-box">
            <i className="fa-solid fa-cloud-bolt fa-2x"></i>
            {Object.values(errors).length > 0 && <p className="errors">{errors.message}</p>}
            <input
                type="text"
                placeholder="Write a comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}