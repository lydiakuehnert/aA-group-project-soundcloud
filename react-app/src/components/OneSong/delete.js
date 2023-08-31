const [liked, setLiked] = useState(false)
const [likes, setLikes] = useState(0)
const [firstRender, setFirstRender] = useState(0)
const toggleLiked = () => {
    setLiked(!liked)
}

useEffect(() => {
    dispatch(getSongThunk(songId))
}, [dispatch])

useEffect(() => {
    if (user && song) {
        const findLike = user.likesList.find(likedSong => likedSong.id === song.id)
        setLiked(Boolean(findLike))
    }
}, [user, song])

useEffect(() => {
    if (firstRender < 2) {
        setFirstRender(prevFirstRender => prevFirstRender + 1)
        setLikes(song.likes)
    }
    else if (liked === false) setLikes(prevLikes => prevLikes - 1)
    else setLikes(prevLikes => prevLikes + 1)
}, [liked])