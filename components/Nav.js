import Image from 'next/image'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
        router.push('/profile/' + id)
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
                        <input className="navsearchbar" type="text" placeholder="Search.." />
                    </div>
                </div>
                <div className="navuser" id="navitem">
                    {user ? 
                    <div className="navavatar">
                        <div onClick={() => setDropdown(!dropdown)}>
                            <img src={userimage} width="70" height="70"/>
                        </div>
                        {dropdown &&
                            <div className="navdropdown">
                                <p>{user.username}</p>
                                <p onClick={() => sendTo(userid)}>Profile</p>
                                <Link href="/createpost">
                                    <p>Create Post</p>
                                </Link>
                                <Link href="/settings">
                                    <p>Settings</p>
                                </Link>
                                <p onClick={logoutUser}>logout</p>
                            </div>
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
