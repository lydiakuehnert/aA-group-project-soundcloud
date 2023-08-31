import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from "../../store/comments";
import CommentPost from "../CommentPost";
import OpenModalButton from "../OpenModalButton";
import DeleteComment from "../DeleteComment";
import EditComment from "../EditComment";
import "./SongComments.css";

export default function SongComments({ song }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const commentsObj = useSelector(state => state.comments.song);
    const comments = Object.values(commentsObj)

    useEffect(() => {
        dispatch(getCommentsThunk(song.id))
    }, [dispatch, song.id])

    if (!comments) return <p>Loading...</p>;
    if (!song) return <p>Loading...</p>;
    if (!song.user) return <p> Loading...</p>;

    return (
        <div className="song-comments">
            {sessionUser && (sessionUser.id !== song.user.id) ? <CommentPost song={song} /> : <></>}
            {sessionUser && !comments.length && sessionUser.id !== song.user.id && 
            <div id="noComment"><h4>Be the first to post a comment!</h4></div>}
            {comments.length > 0 && comments.slice().reverse().map(comment => {
                // const commentMonth = comment.createdAt.split("")[6]
                // const commentMonth2 = comment.createdAt.split("-")[1];
                // let month;
                // if (commentMonth2 < 10) month = months[commentMonth - 1]
                // if (commentMonth2 >= 10) month = months[commentMonth2 - 1]
                const year = comment.createdAt.split(" ")[3]
                const date = comment.createdAt.split(" ")[1]
                const month = comment.createdAt.split(" ")[2]

                return (
                    <div key={comment.id} className="one-comment-box">
                        <h4>{comment.user && comment.user.username}</h4>
                        <h5>
                            {month} {date}, {year}
                        </h5>
                        <p>{comment.comment}</p>
                        <div className="comment-buttons">
                        <div id='deletebtn'>
                        {sessionUser && sessionUser.id === comment.user.id && <OpenModalButton
                            buttonText= <i className="fa-solid fa-trash"></i>
                            modalComponent={<DeleteComment comment={comment} songId={song.id} />}
                        />}
                        </div>
                        <div id='editbtn'>
                        {sessionUser && sessionUser.id === comment.user.id && <OpenModalButton
                            buttonText= <i className="fa-solid fa-pen-nib" ></i>
                            modalComponent={<EditComment comment={comment} songId={song.id} />}
                        />}
                        </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
