import Postform from "../components/Postform"
import AuthContext from "../context/AuthContext"
import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'

const Createpost = () => {

    const router = useRouter()
    let {user} = useContext(AuthContext)

    useEffect(() => {
        if(!user) {
            router.push('/')
        }
    })

    return (
        <div>
            <div className="creatposttitle">
                <h1 className="creatposttitleheader">Create Post</h1>
                <Postform />
            </div>
        </div>
    )
}

export default Createpost

