import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editSongThunk } from '../../store/songs';

export default function SongEdit({ songId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const chosenSong = useSelector(state => Object.values(state.songs.allSongs)).filter(song => song.id === songId)[0];
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [name, setName] = useState(chosenSong.name)
    const [image, setImage] = useState(chosenSong.image)
    const [audio, setAudio] = useState(chosenSong.audio)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const song = { songId, name, user_id, image, audio }
        try {
            const editedSong = await dispatch(editSongThunk(song, songId))
            history.push(`/songs/${editedSong.id}`)
        } catch (error) {
            console.error('Error creating spot:', error)
        }
    }


    return (
        <>
            <h1>still shitty</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>
                        Name
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {errors.name && <p>{errors.name}</p>}
                    <label>
                        Image
                        <input
                            type='text'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                    {errors.image && <p>{errors.image}</p>}
                    <label>
                        Audio
                        <input
                            type='text'
                            value={audio}
                            onChange={(e) => setAudio(e.target.value)}
                        />
                    </label>
                    {errors.audio && <p>{errors.audio}</p>}
                </section>
                <button type="submit">Edit Song</button>
            </form>
        </>
    )
}
