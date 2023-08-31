import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { postImage } from "../../store/session";

export default function AddImageModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState({});
    const [errorClass, setErrorClass] = useState("errors zero-opacity");
    const sessionUser = useSelector(state => state.session.user);

    useEffect(()=> {
        const errorObj = {};
        const fileTypes = ['.jpeg', '.png', '.jpg'];
        if (!(fileTypes.some(type => {
            return url.endsWith(type)}))) {
            errorObj['url'] = 'Image URL must end in .png, .jpg, or .jpeg';
        } if (!url) errorObj['url'] = 'Please set an image or click cancel';
        setErrors(errorObj);
    }, [url])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorClass('errors')
        
        const new_user = {
            // id: sessionUser.id,
            image: url,
            // username: sessionUser.username,
            // email: sessionUser.email,
            // firstname: sessionUser.firstname,
            // lastname: sessionUser.lastname,
            // password: sessionUser.password
        }
        if(!errors.url){
            dispatch(postImage(new_user))
            closeModal()
        }
        
    }

    return (
        <div>
        <input type='url' className='txtInput' 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='Image URL'
                size='30' />
        <p className={errorClass}>{errors.url}</p>
        <button onClick={handleSubmit}>Add Image</button>
        <button onClick={closeModal}>Cancel</button>
        </div>
    )

}