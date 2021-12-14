import Postform from "../components/Postform"
import AuthContext from "../context/AuthContext"
import React, {useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Createpost = () => {

    const router = useRouter()
    let {user, locationset} = useContext(AuthContext)
    const userid = user?.user_id

    useEffect(() => {
        if(!user) {
            router.push('/')
        }
    })

    return (
        <div>
            <div className="creatposttitle">
                {locationset ? 
                <div>
                    <h1 className="creatposttitleheader">Create Post</h1>
                    <Postform />
                </div>
                :
                <div className="setlocation">
                    <div className="setlocationinner">
                        <p>Please set you location in settings in order to make a post. We never reveal you're exact location and only use it to recommand you're post to nearby users.</p>
                        <Link href="/settings">
                            <p className="createpostsettings">Settings</p>
                        </Link>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Createpost

