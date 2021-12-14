import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Image from 'next/image'
import AuthContext from '../../../context/AuthContext'
import Link from 'next/link'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Index = ({data}) => {
    
    let {user} = useContext(AuthContext)

    const router = useRouter()

    const userid = router.query.id
    const loggeduser = user?.user_id

    const [userdata, setUserdata] = useState()
    const [sameuser, setSameuser] = useState()

    useEffect(() => {
        if(loggeduser == userid ) {
            setSameuser(true)
        } else {
            setSameuser(false)
        }
    }, [userid])

    useEffect( async () => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
    }, [userid])
 
    function sendTo(id){
        router.push('/post/' + id)
    }
    
    function message() {
        window.alert("This feature is coming. am solo dev :'). features take time. thanks for waiting :)")
    }

    const deletePost = async (id) => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/post/delete/${id}/`, {
            method: 'DELETE'
        })
        if(response.ok) {
            console.log('wow')
        }
    }
    return (
        <div className="profile">
            <div className="profileusercontainer">
                <div className="profileuser">
                    <img src={data[0]?.author_avatar || userdata?.avatar}/>
                    <h2>{data[0]?.author_username || userdata?.username}</h2>
                    <div className="messageuser">
                        <p onClick={message}>Send Message</p>
                    </div>
                </div>
            </div>
            <div className="profileuserpost">
                {data[0] ? 
                    <div>
                        {data?.map((data) => (
                            <div className="allpostsingle" key={data.id} >
                                <div className="allpostheader" id="profileallpostheader">
                                    <div className="profilepostheader">
                                        <img src={data.author_avatar || userdata?.avatar}/>
                                        <p>{data?.author_username}</p>
                                    </div>
                                    {sameuser &&
                                        <div className="deletepost">
                                            <Popup trigger={<p>Delete Post</p>} position="bottom center">
                                                <div className="confirmdelete">
                                                    <h4>are you sure?</h4>
                                                    <p className="deletepost" onClick={() => deletePost(data.id)}>Delete</p>
                                                </div>
                                            </Popup>
                                        </div>
                                    }
                                </div>
                                <div className="allpostimages" onClick={() => sendTo(data.id)}>
                                    <div className="allpostdiv">
                                        <p>{data.trade}</p>
                                        <img src={data.trade_image} />
                                    </div>
                                    <div>
                                        <img src="../swap.png" className="swapimage"/>
                                    </div>
                                    <div className="allpostdiv">
                                        <p>{data.wanted}</p>
                                        <img src={data.wanted_image} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                :
                <div className="allpostsingle" id="allpostsinglenodata">
                    <p>User Has No Post</p>
                    {sameuser && 
                        <div className="nopostprofile">
                            <Link href="/createpost">
                                <p>Create Post</p>
                            </Link>
                        </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}
export default Index

export const getServerSideProps = async (context) => {
    const response = await fetch(`https://asiqursswap.herokuapp.com/api/post/user/${context.params.id}/`)
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}
