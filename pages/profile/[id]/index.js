import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Image from 'next/image'


const Index = ({data}) => {
    
    const router = useRouter()

    const userid = router.query.id

    const [userdata, setUserdata] = useState()
    console.log("THIS IS ID" + userid)
    console.log("THIS IS USERDAT" + JSON.stringify(userdata))

    useEffect(async () => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
    }, [data])

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
                    <img src={userdata?.avatar} />
                    <h2>{userdata?.username}</h2>
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
                        <p>Asiqur</p>
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
