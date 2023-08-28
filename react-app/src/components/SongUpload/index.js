import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function SongUpload() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!name) validationErrors.name = 'Please provide a valid name'
        if (!image) validationErrors.image = 'Please provide a valid image'
        if (!audio) validationErrors.audio = 'Please provide valid audio'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        }

        const song = { name, image, audio }

        const newSong = await dispatch(createSong(song, user))
        history.push(`/songs/${newSong.id}`)
    }


    return (
        <>
            <h1>form forming form</h1>
            <form>
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
                    <label>
                        Image
                        <input
                            type='text'
                            placeholder='Upload Image (url)'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                    <label>
                        Audio
                        <input
                            type='text'
                            placeholder='Upload Audio (url)'
                            value={audio}
                            onChange={(e) => setAudio(e.target.value)}
                        />
                    </label>
                </section>
            </form>
        </>
    )
}
