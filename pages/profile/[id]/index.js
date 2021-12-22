import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Image from 'next/image'
import AuthContext from '../../../context/AuthContext'
import Link from 'next/link'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Loading from '../../../components/Loading'

const Index = ({data}) => {
    
    let {user} = useContext(AuthContext)

    const router = useRouter()

    const userid = router.query.id
    const loggeduser = user?.user_id

    const [userdata, setUserdata] = useState()
    const [sameuser, setSameuser] = useState()
    const [submitted, setSubmitted] = useState()

    const refreshData = () => {
        router.replace(router.asPath);
    }

    useEffect(() => {
        if(loggeduser == userid ) {
            setSameuser(true)
        } else {
            setSameuser(false)
        }
    })

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
        setSubmitted(true)
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/post/delete/${id}/`, {
            method: 'DELETE'
        })
        if(response.ok) {
            setSubmitted(false)
            refreshData()
        }
    }

    const editPost = (id) => {
        router.push('/editpost/' + id)
    }
 
    return (
        <div className="profile">
            {submitted && 
              <Loading />
            }
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
                            <div className="allpostsingle profilesinglepost" key={data.id} >
                                <div className="allpostheader" id="profileallpostheader">
                                    <div className="profilepostheader">
                                        <img src={data.author_avatar || userdata?.avatar}/>
                                        <p>{data?.author_username}</p>
                                    </div>
                                    {sameuser &&
                                        <div className="profilebuttons">
                                            <div className="profileedit" onClick={() => editPost(data.id)}>
                                                <h4>Edit</h4>
                                            </div>
                                            <div className="deletepost">
                                                <Popup trigger={<p>Delete Post</p>} position="bottom center">
                                                    <div className="confirmdelete">
                                                        <h4>are you sure?</h4>
                                                        <p className="deletepost" onClick={() => deletePost(data.id)}>Delete</p>
                                                    </div>
                                                </Popup>
                                            </div>
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
