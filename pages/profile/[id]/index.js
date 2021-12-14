import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Image from 'next/image'


const Index = ({data}) => {
    
    const router = useRouter()

    const userid = router.query.id

    const [userdata, setUserdata] = useState()
 
    function sendTo(id){
        router.push('/post/' + id)
    }
    
    function message() {
        window.alert("This feature is coming. am solo dev :'). features take time. thanks for waiting :)")
    }
    return (
        <div className="profile">
            <div className="profileusercontainer">
                <div className="profileuser">
                    <img src={data[0]?.author_avatar} />
                    <h2>{data[0]?.author_username}</h2>
                    <div className="messageuser">
                        <p onClick={message}>Send Message</p>
                    </div>
                </div>
            </div>
            <div className="profileuserpost">
             {data?.map((data) => (
                <div className="allpostsingle" key={data.id} onClick={() => sendTo(data.id)}>
                    <div className="allpostheader">
                        <img src="https://asiqstestbucket.s3.amazonaws.com/default.jpg"/>
                        <p>{data?.author_username}</p>
                    </div>
                    <div className="allpostimages">
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
