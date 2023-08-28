import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

export default function SongSearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/songs/search?=${searchTerm}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type='search'
                    placeholder='Search for song name...'
                    size='35'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* changing search button to magnifying glass */}
                {/* <button className="search-button" type='submit'>Search</button> */}
            </form>
        </div>
    )
}
