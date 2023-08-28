import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSongThunk } from '../../store/songs';

export default function SongUpload() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const user_id = user.id
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        }

        const song = { name, user_id, image, audio }
        console.log('hit.')
        const newSong = await dispatch(createSongThunk(song, user))
        console.log('hit!')
        console.log(newSong)
        history.push(`/songs/${newSong.id}`)
    }


    return (
        <>
            <h1>still buggy</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>
                        Name
                        <input
                            type='text'
                            placeholder='Name your track'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {errors.name && <p>{errors.name}</p>}
                    <label>
                        Image
                        <input
                            type='text'
                            placeholder='Upload Image (url)'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                    {errors.image && <p>{errors.image}</p>}
                    <label>
                        Audio
                        <input
                            type='text'
                            placeholder='Upload Audio (url)'
                            value={audio}
                            onChange={(e) => setAudio(e.target.value)}
                        />
                    </label>
                    {errors.audio && <p>{errors.audio}</p>}
                </section>
                <button type="submit">Create Song</button>
            </form>
        </>
    )
}
