import React, { useState, useContext } from "react";
import { useRouter } from 'next/router'
import AuthContext from "../context/AuthContext";
import Postimage from "./Postcomponents/Postimage";
import Loading from "./Loading";
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import Parser from 'html-react-parser';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Postform = () => {

    const router = useRouter()

    let {user} = useContext(AuthContext)
    const [submitted, setSubmitted] = useState()

    const userid = user?.user_id

    const [value, setValue] = useState('');

    const createPost = async (e) => {
        setSubmitted(true)
        e.preventDefault();
        const traded = document.getElementById('tradeimagepic');
        const wanted = document.getElementById('wantedimagepic');
        let formData = new FormData()
        formData.append("author", userid)
        formData.append("trade", e.target.trade.value)
        formData.append("wanted", e.target.wanted.value)
        formData.append("trade_image", traded.files[0])
        formData.append("wanted_image", wanted.files[0])
        formData.append("description", value)
        const response = await fetch('https://asiqursswap.herokuapp.com/api/createpost/', {
        // const response = await fetch('http://127.0.0.1:8000/api/createpost/', {
            method: "POST",
            body: formData
         })

        if(response.status === 200) { 
            setSubmitted(false) 
            router.push('/')
        }
    }
    return (
        <div>
            {submitted &&
            <Loading />
            }
            <form className="postform" onSubmit={createPost}>
                <div className="postforminner">
                    <Postimage />
                    <hr />
                    <div className="postdescriptioncontainer">
                        <div className="postdescription">
                            <p>Add a description of what you have and what you would like to trade for</p>
                            <ReactQuill theme="snow" value={value} toolbar={false} onChange={setValue}/>
                            {value &&
                            <div className="postdescriptiondisplay">{Parser(value)}</div>
                            }
                        </div>
                    </div>
                    <div className="postsubmit">
                        <input type="submit" value="Post" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Postform
