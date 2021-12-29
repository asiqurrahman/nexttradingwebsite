import Image from 'next/image'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"


const Nav = () => {
    
    const router = useRouter()


    let {user, logoutUser} = useContext(AuthContext)

    const [dropdown , setDropdown] = useState(false)
    const [userimage, setUserimage] = useState()

    const userid = user?.user_id

    useEffect(() => {
        const getUserImage =  async () => {
            const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
            // const response = await fetch(`http://127.0.0.1:8000/api/user/${userid}/`)
            const data = await response.json()
            setUserimage(data.avatar)
        }
        getUserImage()
    }, [userid])

    function sendTo(id){
        setDropdown(!dropdown)
        router.push('/profile/' + id)
    }

    const enterkey = (e) => {
        if(e.key === 'Enter') {
            searchpost(e)
        }
    }

    const searchpost = (e) => {
        var searchquarry = e.target.value
        if(searchquarry && searchquarry.replace(/\s/g, '').length){
            router.push('/search/' + searchquarry)
        }
    }

    return (
        <div>
            <nav>
                <div className="navlogo" id="navitem">
                    <div>
                        <Link href="/"><h1>swup</h1></Link>
                    </div>
                </div>
                <div className="navsearch" id="navitem">
                    <div>
                        <input className="navsearchbar" id="navsearch" onKeyUp={enterkey} type="search" placeholder="Search.." />
                    </div>
                </div>
                <div className="navuser" id="navitem">
                    {user ? 
                    <div className="navavatar">
                        <div>
                            <img onClick={() => setDropdown(!dropdown)} src={userimage} width="70" height="70"/>
                        </div>
                        {dropdown &&
                            <motion.div className="navdropdown"
                            initial={{opacity: 0, translateY: 30}} 
                            animate={{opacity: 1, translateY: 0}} 
                            transition={{duration: .3}}
                            >
                                <p>{user.username}</p>
                                <p onClick={() => sendTo(userid)}>Profile</p>
                                <Link href="/createpost">
                                    <p onClick={() => setDropdown(!dropdown)}>Create Post</p>
                                </Link>
                                <Link href="/settings">
                                    <p onClick={() => setDropdown(!dropdown)}>Settings</p>
                                </Link>
                                <div onClick={() => setDropdown(!dropdown)}>
                                    <p onClick={logoutUser}>logout</p>
                                </div>
                            </motion.div>
                        }
                    </div>
                    :
                    <div className="navlogin">
                        <Link href="/login">
                            <p className="navlogintext">Login/Signup</p>
                        </Link>
                    </div>
                    }
                </div>
            </nav>
        </div>

    )
}

export default Nav
