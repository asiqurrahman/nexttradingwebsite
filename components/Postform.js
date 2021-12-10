import React, { useState, useContext } from "react";
import { useRouter } from 'next/router'
import AuthContext from "../context/AuthContext";
import Postimage from "./Postcomponents/Postimage";
import Postdescription from "./Postcomponents/Postdescription";
const Postform = () => {

    const router = useRouter()

    let {user} = useContext(AuthContext)

    const userid = user?.user_id

    const createPost = async (e) => {
        e.preventDefault();
        const traded = document.getElementById('tradeimagepic');
        const wanted = document.getElementById('wantedimagepic');
        let formData = new FormData()
        formData.append("author", userid)
        formData.append("trade", e.target.trade.value)
        formData.append("wanted", e.target.wanted.value)
        formData.append("trade_image", traded.files[0])
        formData.append("wanted_image", wanted.files[0])
        formData.append("trade_description", e.target.traddescription.value)
        formData.append("wanted_description", e.target.wanteddescription.value)
        const response = await fetch('https://asiqursswap.herokuapp.com/api/createpost/', {
        // const response = await fetch('http://127.0.0.1:8000/api/createpost/', {
            method: "POST",
            body: formData
         })

        if(response.status === 200) {  
            router.push('/')
        }
    }
    return (
        <div>
            <form className="postform" onSubmit={createPost}>
                <div className="postforminner">
                    <Postimage />
                    <Postdescription />
                    <div className="postsubmit">
                        <input type="submit" value="Post" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Postform
