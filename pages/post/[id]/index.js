import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Singlepostimages from '../../../components/Singlepost/Singlepostimages'
const Index = ({data}) => {
    const [userdata, setUserdata] = useState()
    const userid = data?.author
    useEffect( async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
    }, [data])
    return (
        <div className="postpreview">
            <div className="postpreviewheader">
                <img src={userdata?.avatar} />
                <h1>{userdata?.username}</h1>
            </div>
            <Singlepostimages data={data}/>
        </div>
    )
}

export default Index

export const getServerSideProps = async (context) => {
    const response = await fetch(`http://127.0.0.1:8000/api/post/${context.params.id}/`)
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}
